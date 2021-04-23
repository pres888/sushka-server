# Сервер для приборов сушки.

## Структура

Сервер создает три порта для работы:

1. (Data) Порт обмена с прибором. Получает данные с приборов и отправляет в ответ команды управления или параметры.
2. (Socket) Порт двухстороннего обмена с WEB-интерфейсом.
3. (Web) Порт WEB-интерфейса (не обязательный)

```
┌──────────┐        ┌──────────┐
│          ├───────►│          │
│  Прибор  │        │   Data   │
│          │◄───────┤          │
└──────────┘        └──────────┘

                    ┌──────────┐
                    │          │
                ┌──►│  Socket  │
┌───────────┐   │   │          │
│           │◄──┘   └──────────┘
│  Оператор │
│           │◄─┐    ┌──────────┐
└───────────┘  │    │          │
               └────┤   Web    │
                    │          │
                    └──────────┘
```

## Токен

Раздел в разработке.
На данный момент используйте значение токена равное `default-token`.

## Протокол порта обмена (Data).

Передача данных с приборов осуществляется посредством HTTP POST-запроса.
Данне передаются в виде текстовых строк. Одна строка - один параметр. Строки имеют вид:
```
<поле>=<значение>
```

Пример запроса:
```
POST /default-token/1234

time=Заморозка: 26:15
t1=56
t2=58
vacuum1=940
wifi=50
```

В ответ придет набор строк с командами управления (если есть) или измененными параметрами. Формат ответа аналогичен формату запроса -
набор строк вида `<поле>=<значение>`

Образец:
```
key1=1
tsub=40
```

Для корректрой работы необходимо установить заголовок

```
Content-Type: text/plain
```

Пример реализации отправки на ESP32 (работоспособность не проверялась):

```c
char local_response_buffer[MAX_HTTP_OUTPUT_BUFFER] = {0};

esp_http_client_config_t config = {
    .url = "http://sushka.navi.cc:8081/default-token/1234",
    .event_handler = _http_event_handler,
    .user_data = local_response_buffer,
};

const char *post_data = "t1=60\nt2=30\n";

esp_http_client_handle_t client = esp_http_client_init(&config);
esp_http_client_set_method(client, HTTP_METHOD_POST);
esp_http_client_set_header(client, "Content-Type", "text/plain");
esp_http_client_set_post_field(client, post_data, strlen(post_data));
err = esp_http_client_perform(client);
if (err == ESP_OK) {
    ESP_LOGI(TAG, "HTTP POST Status = %d, content_length = %d",
            esp_http_client_get_status_code(client),
            esp_http_client_get_content_length(client));
    ESP_LOGD(TAG, "local_response_buffer=%d",  strlen(local_response_buffer));
    ESP_LOGI(TAG, "%s",  local_response_buffer);
} else {
    ESP_LOGE(TAG, "HTTP POST request failed: %s", esp_err_to_name(err));
}
```


## WEB страница

На данный момент, задать идентификатор прибора можно указав его в адресной строке после символа `#`:

https://sushka.navi.cc/#1234

Если нужно изменить идентификатор, то его нужно указать в адресной строке, а затем перезагрузить страницу в браузере (F5).


## Запуск сервера

```
npm i
npm run build
node ./server.js
```

Можно открыть страницу по адресу `http://localhost:8080/#1234`.

## Запуск WEB-сервера для отладки

```
npm i
npm run notserve
```

Можно открыть страницу по адресу `http://localhost:9000/#1234`.

При изменении исходных файлов, WEB-страница будет перекомпилирована. Некоторые элементы будут обновлены автоматически, например, файл стилей. Для обновления остального, достаточно обновить страницу в браузере.


## Использование внешнего хостинга для WEB.

WEB-страница не является частью сервера, и может использоваться отдельно.
Ее можно разместить на собственном хостинге.

Для этого нужно собрать WEB-страницу:

```
npm i
npm run build
```

И содержимое каталога `./dist` можно скопировать на произвольный хостинг.
В настройках хостинга, нужно настроить переадресацию ошибки `404` на страницу `index.html`.

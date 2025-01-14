

export const fixLinks = (hwid) => {
    document.querySelector('a[href="/#"]').href += hwid;
    document.querySelector('a[href*="logs.html"]').href += hwid;
    document.querySelector('a[href*="series.html"]').href += hwid;
    // .href = "";
    // console.log("Logs: ", logs);

    window.onhashchange = () => {
        // console.log("Changed", location.hash);
        location.reload();
    }
}

export const replaceChildren = (node, children) => {
    if("replaceChildren" in node) {
        node.replaceChildren(children)
    } else {
        node.innerHTML = '';
        if(children) node.appendChild(children);
    }
}

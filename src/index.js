const hello = document.createElement("div");
hello.innerHTML = "Hello from index.js!!!";
document.body.appendChild(hello);

if (module && module.hot) {
  module.hot.accept();
}

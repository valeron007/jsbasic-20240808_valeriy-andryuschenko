export default function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click',function(event) {
      resolve(event);
    }, {once: true});
  });
}

const container = document.querySelector('container');

function r(from, to) {
  return Math.random() * (to - from + 1) + from;
}

function ri(from, to) {
  return ~~r(from, to);
}

function pick() {
  return arguments[ri(0, arguments.length - 1)];
}

function build() {
  container.innerHTML = '<div class="shape"></div>' +
    sequence(50, () => `
      <p style="--offset: ${ r(50, 100) }; color: ${ pick('#F0FFF3', '#fff') }">
        ${ generateText(ri(20, 100)) }
      </p>
    `);
}

function generateText(times = 100) {
  return sequence(times, () => `
    <span>${ String.fromCharCode(ri(0x25a0, 0x25FC)) }</span>
  `);
}

function sequence(count, fn) {
  let ret = [];
  for (let i = 0; i < count; ++i) {
    ret.push(fn(i));
  }
  return ret.join('');
}

build();
document.body.addEventListener('click', build);
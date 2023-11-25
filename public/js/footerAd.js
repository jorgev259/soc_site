window.tyche = { mode: 'tyche', config: '//config.playwire.com/1023181/v2/websites/71145/banner.json' }
const iframe = document.getElementById('id01_62693')
let t = ''
t += window.location
t = t.replace(/#.*$/g, '').replace(/^.*:\/*/i, '').replace(/\./g, '[dot]').replace(/\//g, '[obs]').replace(/-/g, '[dash]')
t = encodeURIComponent(encodeURIComponent(t))
iframe.src = iframe.src.replace('iframe_banner', t)
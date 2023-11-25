const iframes = document.getElementById('id01_909824')
let ts = ''
ts += window.location
ts = ts.replace(/#.*$/g, '').replace(/^.*:\/*/i, '').replace(/\./g, '[dot]').replace(/\//g, '[obs]').replace(/-/g, '[dash]')
ts = encodeURIComponent(encodeURIComponent(ts))
iframes.src = iframes.src.replace('iframe_banner', ts)
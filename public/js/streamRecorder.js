function startRecording() {
    console.log("test");
    const btn = this;
    btn.onclick = stopRecording;
    const video = document.getElementById('video-player-2');

    const chunks = [];
    const rec = new MediaRecorder(video.srcObject);
    console.log(rec);
    rec.ondataavailable = e => {
        chunks.push(e.data);
        console.log(e.data);
    }
    rec.onstop = e => download(new Blob(chunks));
    rec.start();

    function stopRecording() {
        rec.stop();
        btn.onclick = startRecording;
    }
}

function download(blob) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'recorded.webm';
    document.body.appendChild(a);
    a.click();
}
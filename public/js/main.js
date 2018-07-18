let processor = {};

let webdsp = {};
loadWASM("/lib/webdsp_c.wasm").then(module => {
    webdsp = module;
});

let procFunc;

processor.doLoad = function () {
        this.video = document.getElementById('video-player');
        this.c1 = document.getElementById('c1');
        this.ctx1 = this.c1.getContext('2d');
        this.c2 = document.getElementById('c2');
        this.ctx2 = this.c2.getContext('2d');
        let self = this;
        this.video.addEventListener('play', () => {
            self.width = self.video.videoWidth;
            self.height = self.video.videoHeight;
            self.c1.width = self.video.videoWidth;
            self.c1.height = self.video.videoHeight;
            self.c2.width = self.video.videoWidth;
            self.c2.height = self.video.videoHeight;
            self.timerCallback();
        }, false);
    },
    processor.timerCallback = function () {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.computeFrame();
        let self = this;
        setTimeout(() => {
            self.timerCallback();
        }, 0);
    },
    processor.computeFrame = function () {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        frame.data.set(webdsp.invert(frame.data));
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            let a = frame.data[i * 4 + 3];
        }
        this.ctx2.putImageData(frame, 0, 0);
        return;
    }
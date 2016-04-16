window.onload = function() {
    var video = document.querySelector("#cameraContainer");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var tracker = new tracking.ObjectTracker('face');

    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#cameraContainer', tracker, {
        camera: true
    });

    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (event.data.length === 0) {

        } else {
            event.data.forEach(function(rect) {
                // rect.x, rect.y, rect.height, rect.width
                console.log("rect width "+ rect.width);
                console.log("rect height"+ rect.height);
                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            });
        }
    })
}
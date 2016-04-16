var lastX = -1;
var lastY = -1;
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

    $('#left-btn').click(function() {
        player.body.velocity.x = -200;
    });
    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (event.data.length === 0) {

        } else {
            event.data.forEach(function(rect) {
                // rect.x, rect.y, rect.height, rect.width
                // console.log("rect width "+ rect.width);
                // console.log("rect height"+ rect.height);
                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                var centerX = rect.x + rect.width / 2;
                var centerY = rect.y + rect.height / 2;

                if (lastX == -1 && lastY == -1){
                    lastX = rect.width/2;
                    lastY = rect.height/2;
                }
                var halfX = 90;
                var halfY = 60;
                var changeX = centerX - halfX;
                var changeY = centerY - halfY;

                lastX = centerX;
                lastY = centerY;
                console.log('rect '+rect.width+' x '+rect.height);
                console.log('rect x = '+rect.x+', y = '+rect.y);
                // console.log(changeX);
                // console.log(changeY);
                if (changeX <= 0) {
                    player.body.velocity.x = 300;
                    console.log('moving left');
                } else {
                    player.body.velocity.x = -300;
                    console.log('moving right');

                    $(document).on("keydown", function(event) {
                        switch (event.which) {
                            case $.ui.which.LEFT:
                                console.log("left");
                                break;
                            case $.ui.which.RIGHT:
                                console.log("right");
                                break;
                            case $.ui.which.UP:
                                console.log("up");
                                break;
                            case $.ui.which.DOWN:
                                console.log("down");
                                break;
                        }
                    });
                }

            });
        }
    });
};

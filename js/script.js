
var spinX, spinY, pressMark, mousCord_sr_X, mousCord_sr_Y, mousCord_end_X, mousCord_end_Y;

var rotateX = localStorage.getItem("rotateX");
var rotateY = localStorage.getItem("rotateY");

rotateX = rotateX * 1;
rotateY = rotateY * 1;

if(!rotateX){ rotateX = 40; }
if(!rotateY){ rotateY = 40; }


$(function(){
    
    var mouse = { 
            start : {}
        },
        touch = document.ontouchmove !== undefined,
        viewport = {
            x: rotateX, 
            y: rotateY, 
            el: $('#cube')[0],
//             bee: $('.pX img')[0], 
            move: function(coords) {
                if(coords) {
                    if(typeof coords.x === "number") this.x = coords.x;
                    if(typeof coords.y === "number") this.y = coords.y;
                }
    
//                 this.bee.style.webkitTransform = "rotateX(-"+this.x+"deg) rotateY(-"+this.y+"deg)"; 
                this.el.style.webkitTransform = "rotateX("+this.x+"deg) rotateY("+this.y+"deg)";
            },
            pressKey: function(coords) {
                if(coords) {
                    if(typeof coords.x === "number") this.x = coords.x;
                    if(typeof coords.y === "number") this.y = coords.y;

                    localStorage.setItem("rotateX", this.x);
                    localStorage.setItem("rotateY", this.y);
                }
    
                this.el.style.webkitTransform = "rotateX("+this.x+"deg) rotateY("+this.y+"deg)";
            },
            reset: function() {
                this.move({x: 0, y: 0});
            }
        };

        viewport.move({x: rotateX, y: rotateY});
        
    viewport.duration = function() {
        var d = touch ? 50 : 500;
        viewport.el.style.webkitTransitionDuration = d + "ms";
        return d;
    }();
    
    $(document).keydown(function(evt) {
        switch(evt.keyCode)
        {    
            case 37: // left
                viewport.pressKey({y: viewport.y - 90});
                break;
            
            case 38: // up
                evt.preventDefault();
                viewport.pressKey({x: viewport.x + 90});                
                break;
            
            case 39: // right
                viewport.pressKey({y: viewport.y + 90});
                break;
                
            case 40: // down
                evt.preventDefault();
                viewport.pressKey({x: viewport.x - 90});
                break;
                
            case 27: //esc
                viewport.reset();
                break;
                
            default:
                break;
        };    
    }).bind('mousedown touchstart', function(evt) {
        delete mouse.last;
        if($(evt.target).is('a, iframe')) {
            return true;
        }
        
        evt.originalEvent.touches ? evt = evt.originalEvent.touches[0] : null;
        mouse.start.x = evt.pageX;
        mouse.start.y = evt.pageY;


        $(document).bind('mousemove touchmove', function(event) {
            // Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
            if(!touch || !(event.originalEvent && event.originalEvent.touches.length > 1)) {
                event.preventDefault();
                // Get touch co-ords
                event.originalEvent.touches ? event = event.originalEvent.touches[0] : null;
                $('#viewport').trigger('move-viewport', {x: event.pageX, y: event.pageY});            
            }            
        });    
        
        $(document).bind('mouseup touchend', function () {
            $(document).unbind('mousemove touchmove');
        });
    });
    
    $('#viewport').bind('move-viewport', function(evt, movedMouse) {
    
        // Reduce movement on touch screens
        //var movementScaleFactor = touch ? 4 : 1;
        var movementScaleFactor = 4;
        
        if (!mouse.last) {
              mouse.last = mouse.start;
        } else {
              if (forward(mouse.start.x, mouse.last.x) != forward(mouse.last.x, movedMouse.x)) {
                  mouse.start.x = mouse.last.x;
              }
              if (forward(mouse.start.y, mouse.last.y) != forward(mouse.last.y, movedMouse.y)) {
                  mouse.start.y = mouse.last.y;
             }
        }
        
        var dataX = viewport.x + parseInt((mouse.start.y - movedMouse.y)/movementScaleFactor);
        var dataY = viewport.y - parseInt((mouse.start.x - movedMouse.x)/movementScaleFactor);



        console.log(dataX);
        console.log(dataY);
        console.log("-------------");

        viewport.move({
            x: viewport.x + parseInt((mouse.start.y - movedMouse.y)/movementScaleFactor),
            y: viewport.y - parseInt((mouse.start.x - movedMouse.x)/movementScaleFactor)
        });
        
        mouse.last.x = movedMouse.x;
        mouse.last.y = movedMouse.y;

        localStorage.setItem("rotateX", dataX);
        localStorage.setItem("rotateY", dataY);  
            
        function forward(v1, v2) {
            return v1 >= v2 ? true : false;
        }
    });
    
});



$('.cub-side[id $= 5]').click(function() {
    var info = $(this).css('transform');
    alert(info);
    //alert(info.match(/matrix3d\(\d+, ?\d+, ?\d+, ?\d+, ?(\d+)/)[1]);
});


/*
rotateX = rotateX * 1;
rotateY = rotateY * 1;

if(!!rotateX){
    spinX = rotateX;
} else {
    spinX = -40;
}

if(!!rotateY){
    spinY = rotateY;
} else {
    spinY = 40;
}

$("#cube").css("transform", "rotateX("+ spinX +"deg) rotateY("+ spinY +"deg) ");

// var spinX =0, spinY = 0;

$(document).keyup(function(evt) {
    $("#cube").removeClass("press-kl-trans");
});


$(document).keydown(function(evt) {

    $("#cube").addClass("press-kl-trans");

    switch(evt.keyCode)
        {    
            case 37: // left
                spinY -= 90;
                spinStage(spinX,spinY);
                // viewport.move({y: viewport.y - 10});
                break;
            
            case 38: // up
                evt.preventDefault();
                spinX += 90;
                spinStage(spinX,spinY);
                // viewport.move({x: viewport.x + 10});                
                break;
            
            case 39: // right
                spinY += 90;
                spinStage(spinX,spinY);
                // viewport.move({y: viewport.y + 10});
                break;
                
            case 40: // down
                evt.preventDefault();
                spinX -= 90;
                spinStage(spinX,spinY);
                // viewport.move({x: viewport.x - 10});
                break;
                
            case 27: //esc
                // viewport.reset();
                break;
                
            default:
                break;
        };

    });


function spinStage(X,Y){
 
    $("#cube").css("transform", "rotateX("+ X +"deg) rotateY("+ Y +"deg) ");

    $("#cube").attr("data-rotet-x", X);
    $("#cube").attr("data-rotet-y", Y);

    localStorage.setItem("rotateX", X);
    localStorage.setItem("rotateY", Y);
}



$(document).mousedown(function(e) {
    pressMark = 1;

    mousCord_sr_X = e.pageX; // положения по оси X
    mousCord_sr_Y = e.pageY; // положения по оси Y
});


$(document).mousemove(function(e) {
    if(pressMark == 1){
        mousCord_end_Y = e.pageX - mousCord_sr_X; // положения по оси X
        mousCord_end_X = mousCord_sr_Y - e.pageY; // положения по оси Y



        console.log(e.pageX);
        console.log(e.pageY);



        spinX = spinX + mousCord_end_X / 20;
        spinY = spinY + mousCord_end_Y / 20;


        console.log("##########");

        $("#cube").attr("data-rotet-x", spinX);
        $("#cube").attr("data-rotet-y", spinY);

        $("#cube").css("transform", "rotateX("+ spinX +"deg) rotateY("+ spinY +"deg) ");

        // console.log(spinX);
        // console.log(spinY);
        // console.log("-------------");
    }
});


$(document).mouseup(function() {

    localStorage.setItem("rotateX", spinX);
    localStorage.setItem("rotateY", spinY);

    // var gipotinuza = mousCord_end_X * mousCord_end_X + mousCord_end_Y * mousCord_end_Y;

    // console.log(gipotinuza);
    // console.log("rrrrrrrrrrrrr");
    pressMark = 0;
    // alert(Math.sqrt(gipotinuza));
});


$(".cn-img").click(function(){
  $(this).toggleClass("act-el");
});



$(".cub-side").click(function(){
    var con = $(this).attr("style");
    console.log(con);
});

*/

$(".wr-inp-img button").click(function(){
    var input_img = $(this).closest("li").find("input");
    var zn_input_img = input_img.val();
    var zn_side = input_img.attr("data-inSide");
    $(".cub-side[data-side="+zn_side+"] .img-background").attr("style", "background: url("+zn_input_img+") no-repeat;");
    localStorage.setItem("sideCub-"+zn_side, zn_input_img);   //-----  установка значения
});


for(var i = 1; i < 7; i++) {
    var zn_loc_img = localStorage.getItem("sideCub-"+i);
    if(!!zn_loc_img) {
        $(".wr-inp-img input[data-inSide="+i+"]").val(zn_loc_img);
        $(".cub-side[data-side="+i+"] .img-background").attr("style", "background: url("+zn_loc_img+") no-repeat;");
    }
}





//---------------

// var ms_img_src = [0];

// $(".wr_img_sl img").each(function(){
//     ms_img_src[ms_img_src.length] = $(this).attr("src");
// });

// console.log(ms_img_src)

// for(var k = 1; k < ms_img_src.length; k++){
//     var deg_ret = 360 / ms_img_src.length;
//     deg_ret = deg_ret * k;
//     //$("#cube").append('<div class="fig-'+k+' cn-img" style="background: url('+ms_img_src[k]+') no-repeat; -webkit-transform: rotateX(0deg) rotateY('+deg_ret+'deg) translateX(30px) translateY(0px) translateZ(0px);"><span>'+ k +'</span></div>');
//     $("#cube").append('<div class="fig-'+k+' cn-img" style="background: url('+ms_img_src[k]+') no-repeat; -webkit-transform: rotateX(0deg) rotateY(0deg) translateX(110px) translateY(0px) translateZ(0px);"><span>'+ k +'</span></div>');
// }

// $("#cube").click(function(){
//     var cc = 0, yy = 0;
//     var deg_ret = 360 / (ms_img_src.length - 1);

//     $("#cube > div").each(function(){
//         var deg_ret_item = 28 * cc;
//         if(deg_ret_item > 360) {
//             var zn_cr = deg_ret_item % 360;
            
//             console.log(zn_cr);

//             $(this).css("-webkit-transform", "rotateX(0deg) rotateY("+zn_cr+"deg) translateX(110px) translateY("+yy+"px) translateZ(0px)");
//         } else {
//            $(this).css("-webkit-transform", "rotateX(0deg) rotateY("+deg_ret_item+"deg) translateX(110px) translateY("+yy+"px) translateZ(0px)");

//         }
//         cc++;
//         yy += 15;
//     });

// });





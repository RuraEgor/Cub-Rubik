
var spinX = 0, spinY = 0;

$(document).keydown(function(evt) {
switch(evt.keyCode)
    {    
        case 37: // left
            spinY -= 1;
            spinStage(spinX,spinY);
            // viewport.move({y: viewport.y - 10});
            break;
        
        case 38: // up
            evt.preventDefault();
            spinX += 1;
            spinStage(spinX,spinY);
            // viewport.move({x: viewport.x + 10});                
            break;
        
        case 39: // right
            spinY += 1;
            spinStage(spinX,spinY);
            // viewport.move({y: viewport.y + 10});
            break;
            
        case 40: // down
            evt.preventDefault();
            spinX -= 1;
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
}

$(".cn-img").click(function(){
  $(this).toggleClass("act-el");
});



$(".cub-side").click(function(){
    var con = $(this).attr("style");
    console.log(con);
});


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


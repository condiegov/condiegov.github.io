window.onload=getExif;
i = 1
//get image data and start function
function getExif() {
    //grab img tag
    var img = document.getElementById("img");
    EXIF.getData(img, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        /*var fstop = EXIF.getTag(this, 'F-stop');
        var exposure = EXIF.getTag(this, 'Exposure time');
        var focal = EXIF.getTag(this, 'Focal length');
        var iso = EXIF.getTag(this, 'ISO')*/
        //get img model and settings html tag
        var makeAndModel = document.getElementById("makeAndModel");
        var settingsInfo = document.getElementById('settingsInfo');
        var modelImg = document.getElementById('modelImg');
        //change modelImg depending on if the image was shot on a iphone or a dslr
        if (model.includes('iPhone')) modelImg.src='https://s.yimg.com/ap/build/images/scrappy-camera-icons/iPhone6-7-8.png';
        else modelImg.src="https://s.yimg.com/ap/build/images/scrappy-camera-icons/NikonD100.png";
        //update html
        makeAndModel.innerHTML = `${make} ${model}`;
        settingsInfo.innerHTML = i/*`${EXIF.getTag(this, 'undefined')}`*/;
        i++
        console.log('should have changed exif tag')
    });
};

//starts img arrays
var imgs = []
//image counter
var currentImg = 0
//add stuff to img array
for(i = 0;39 > i;i++) {
    if(i <= 9) {
        imgs.push(`./portfolio/00${i}.jpg`)
    }
    else {
        imgs.push(`./portfolio/0${i}.jpg`)
    }
}
//remove the 000.jpg from array sinec its not a real image
imgs.splice(0, 1)
//check if next image is availiable and change img
function checkNextImg(direction, addrs){
    console.log(currentImg)
    if (imgs[currentImg + 1]) {
        currentImg++
        addrs.src = imgs[currentImg]
        getExif()
    }
}
//check if previous image is availiable and change img
function checkPreviousImg(direction, addrs){
    if (imgs[currentImg + -1]) {
        currentImg--
        addrs.src = imgs[currentImg]
        getExif()
    }
}
//prevent from it selecting everything from double clicking or clicking too fast
window.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
//call checkImg function depending on which state the cursor is at *zoom isnt implemented yet*
window.addEventListener('click', function() {
    //get cursor class
    var cursor = document.getElementById('cursor-image');
    var cursor_class = cursor.getAttribute('class');
    var img = document.getElementById('img')
    //check what state its in and call function accordingly
    if (cursor_class === 'left') {
        checkPreviousImg(cursor_class, img)
    } else if (cursor_class === 'right') {
        checkNextImg(cursor_class, img)
    } else if (cursor_class === 'zoom') {
    }
})

//capture mouse and move/change the cursor sprites depending on where the cursor currently is 
window.addEventListener('mousemove',function() {
    //check mouse position and update cursor img accordingly
    var cursor = document.getElementById('cursor-image');
    if (event.clientX < window.innerWidth / 3) {
        cursor.className = 'left'
    } else if (event.clientX > window.innerWidth / 3 * 2) {
        cursor.className = 'right'
    } else {
        cursor.className = 'zoom'
    }
})
//adjust cursor sprite to be set at the correct area
window.addEventListener('mousemove',function() {
    //grab cursor class
    var cursor = document.getElementById('cursor-image');
    var cursor_class = cursor.getAttribute('class');
    //check which state the img class then move the sprite to where its suppose to be
    if (cursor_class === 'left') {
        cursor.style.top = Math.min(window.innerHeight - 15 - 9, event.clientY) + 'px',
        cursor.style.left = Math.min(window.innerWidth + 15 + 9, event.clientX - 20) + 'px'
    } else if (cursor_class === 'right') {
        cursor.style.top = Math.min(window.innerHeight - 15 - 9, event.clientY) + 'px',
        cursor.style.left = Math.min(window.innerWidth - 15 - 9, event.clientX + 17) + 'px'
    } else if (cursor_class === 'zoom') {
        cursor.style.top = Math.min(window.innerHeight - 15 - 9, event.clientY - 24) + 'px',
        cursor.style.left = Math.min(window.innerWidth - 15 - 9, event.clientX - 8) + 'px'
    } else {
        cursor.style.top = Math.min(window.innerHeight - 15 - 9, event.clientY) + 'px',
        cursor.style.left = Math.min(window.innerWidth - 15 - 9, event.clientX + 17) + 'px'
    }
})
window.onload=getExif;
function getExif() {
    var img = document.getElementById("img");
    EXIF.getData(img, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var fstop = EXIF.getTag(this, 'F-stop');
        var exposure = EXIF.getTag(this, 'Exposure time');
        var focal = EXIF.getTag(this, 'Focal length');
        var iso = EXIF.getTag(this, 'ISO')
        var makeAndModel = document.getElementById("makeAndModel");
        var settingsInfo = document.getElementById('settingsInfo');
        var modelImg = document.getElementById('modelImg');
        if (model.includes('iPhone')) modelImg.src='https://s.yimg.com/ap/build/images/scrappy-camera-icons/iPhone6-7-8.png';
        else modelImg.src="https://s.yimg.com/ap/build/images/scrappy-camera-icons/NikonD100.png";
        makeAndModel.innerHTML = `${make} ${model}`;
        settingsInfo.innerHTML = `${EXIF.getTag(this, 'undefined')}`;
    });
};

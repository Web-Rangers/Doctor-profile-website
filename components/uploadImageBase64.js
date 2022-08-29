export function encodeImageFileAsURL(file, fn) {
    var filesSelected = file.files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;

        fn(srcData.toString())
      }
      fileReader.readAsDataURL(fileToLoad);
    }
}
/**read and uplaod file content*/
function uploadFile() {
    var f_input = document.getElementById('fileinput');

    var targetF = f_input.files[0];

    if (targetF) {
        var f_reader = new FileReader();
        f_reader.onload = function() {
            var content = f_reader.result;

            /**Update the editor with new data read from the file */
            CKEDITOR.instances['inputdiv'].setData(content);
            //console.log(content);
        }
        f_reader.readAsText(targetF);
    }
}
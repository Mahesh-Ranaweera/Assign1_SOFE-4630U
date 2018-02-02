/**read and uplaod file content*/
var uploadFile = function(event) {
    var targetF = event.target.files[0];

    if (targetF) {
        var f_reader = new FileReader();
        f_reader.onload = function() {
            var content = f_reader.result;
            var textarea = document.getElementById('inputdiv');
            textarea.value = content;
            console.log(content);
        }
        f_reader.readAsText(targetF);
    }
}
/**read and uplaod file content*/
function uploadFile() {
    var targetF = event.target;

    var f_reader = new FileReader();
    f_reader.onload = function() {
        var content = f_reader.result;
        var textarea = document.getElementById('inputdiv').value = content;
        console.log(content);
    }
    f_reader.readAsText(targetF.files[0]);
}
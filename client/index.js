function onSubmit() {
    var t1 = document.getElementById('t1').value
    var t2 = document.getElementById('t2').value
    $.ajax({
        type: 'POST',
        url : '/hi',
        data: {
            a : Number(t1),
            b : Number(t2)
        },
        success: function(response) {
            document.getElementById('output').innerHTML = response['c'];
        },
        error: function(error) {
            console.log(error);
        }
    })
}
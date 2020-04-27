$(document).ready(function() {
    $('.tabla-container').hide();
    console.log('Se escondió la tabla')
});

$('form').on('submit', function(event) { //consigue datos de la tabla
    event.preventDefault();
    const user = $('#user').val();
    const email = $('#email').val();
    const password = $('#password').val();
    console.log('User', user);
    console.log('Email', email);

    $.ajax({    //envía la tabla
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: JSON.stringify({
            user: user,
            email: email,
            password: password,
        }),
        contentType: 'application/json'
    }); 

    $('.formulario-container').hide(); //esconde form


    $.getJSON('http://localhost:3000/', function (data){ // construye la tabla
        $.each(data, function(i, item) {
            $('<tr>').append(
                $('<td>').html(item.user),
                $('<td>').html(item.email),
            ).appendTo('table');
        });
    });

    $('.tabla-container').show(); //muestra tabla
});
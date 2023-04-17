$(document).ready(AvvioGioco);

function AvvioGioco() {
    $('#message').html('');
    $('.holder div').removeClass('vincitorex');
    $('.holder div').removeClass('vincitoreo');
    $('.holder div').on('click', Gioca);
}

function ControllaVincitore() {
    //ritorna true se ho vinto
    let vinto = false;
    //controllo se ho vinto
    let possibili_vincite = ['.r1', '.r2', '.r3', '.c1', '.c2', '.c3', '.d1', '.d2'];
    possibili_vincite.forEach(function (vincita) {
        if ($(vincita).text() == 'xxx') {
            vinto = true;
            $(vincita).addClass('vincitorex');
            $('#message').html('Hai vinto tu!');
        }
        if ($(vincita).text() == 'ooo') {
            vinto = true;
            $(vincita).addClass('vincitoreo');
            $('#message').html('Ha vinto lui!');
        }
    });
    //non ha vinto nessuno
    return vinto;
}

function Gioca() {
    //clicco su una delle celle
    if ($(this).text() == '') { //non posso cliccare su una cella piena
        $(this).text('x');
        $('.holder div').off('click');
        if (ControllaVincitore()) {
            $('.holder div').off('click');
        } else {
            //l'altro gioca solo se io non ho vinto
            if ($('.holder div:empty').length > 0) {
                setTimeout(function () {
                    //gioca l'avversario
                    let casuale = Math.floor(Math.random() * 9) + 1;
                    while ($('.holder div.cella' + casuale).text() != '') {
                        //while ($('.holder div:eq(' + (casuale - 1) + ')').text() != '') {
                        //while ($('.holder div:nth-child(' + casuale + ')').text() != '') {
                        casuale = Math.floor(Math.random() * 9) + 1;
                    }
                    $('.holder div.cella' + casuale).text('o');
                    if (ControllaVincitore()) {
                        $('.holder div').off('click');
                    }
                    $('.holder div').on('click', Gioca);
                }, 1000);
            } else {
                alert('Pareggio!');
                $('.holder div').off('click');
            }
        }
    }
}
//Открытие списка

function group(cls, pp) {
    let a = true;

    if ($(cls).css('display') == 'block') {
        $(cls).css({ 'display': 'none' });
    } else if ($(cls).css('display') == 'none') {
        $('.sub-list').css({ 'display': 'none' });
        $(cls).css({ 'display': 'block' });
    }

    Array.from(document.querySelectorAll('.group-li'), function (el) {
        el.onclick = function () {
            var name = this.innerHTML;
            $(pp).html(name);
            $(cls).css({ 'display': 'none' });
        }
    });
}

//Создание нового пользователя

function n_user() {
    $('.new-user-block').css({ 'display': 'block' });
    $('.back-form').css({ 'display': 'block' });
}

function exit() {
    $('.new-user-block').css({ 'display': 'none' });
    $('.back-form').css({ 'display': 'none' });
    $('.input').val('');
    $('.group-p2').html('1');
    $('#role1').click();
    $('.input').removeClass('error');

    $('.creare').html('Создать');
    $('.create').attr('onclick', 'create()');
}

let role = 'Ученик';

$('.input-role').on('click', function () {

    if (this.id == 'role1') {
        $('.group-p2').removeClass('hidden');
        $('.group-p2').addClass('n-hidden');
        $('.group-p2').html('1');
    } else {
        $('.group-p2').removeClass('nhidden');
        $('.group-p2').addClass('hidden');
        $('.group1').css({ 'display': 'none' });
        $('.group-p2').html(' ');
    }

    role = this.value;
});

let form = document.querySelector('.new-user-block');
let inputs = document.querySelectorAll('.input');

function create() {
    let name = $('.input-name').val().trim();
    let surname = $('.input-surname').val().trim();
    let pat = $('.input-patronymic').val().trim();
    // let login = $('.input-login').val().trim();
    // let password = $('.input-password').val().trim();
    let group = $('.group-p2').html();

    let empty_inputs = Array.from(inputs).filter(input => input.value === '');
    let alrt = 1;
    let errors = true;

    inputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');
            if (alrt == 1) {
                errors = true;
                alert('Заполните все поля!');
                alrt--;
            }

        } else { 
            input.classList.remove('error');
            errors = false; 
        }
    });

    if (!errors) {

        let tr = document.createElement('tr'),
            td_fio = document.createElement('td'),
            td_group = document.createElement('td'),
            td_role = document.createElement('td'),
            td_func = document.createElement('td'),
            span_surname = document.createElement('span'),
            span_name = document.createElement('span'),
            span_pat = document.createElement('span'),
            change = document.createElement('button'),
            del = document.createElement('button');

        let el = document.querySelector('tbody');
        let header = document.querySelector('.table-names');

        el.append(tr);
        el.prepend(header);

        tr.append(td_fio);
        tr.append(td_group);
        tr.append(td_role);
        tr.append(td_func);

        td_fio.append(span_surname);
        td_fio.append(span_name);
        td_fio.append(span_pat);

        td_func.append(change);
        td_func.append(del);

        $(tr).attr('class', 'table-user');
        $(td_func).attr('class', 'func');
        $(span_surname).attr('class', 'surname');
        $(span_name).attr('class', 'name');
        $(span_pat).attr('class', 'patronymic');
        $(change).attr('class', 'change');
        $(del).attr('class', 'delete');
        $(change).addClass('table-btn');
        $(del).addClass('table-btn');

        $(span_surname).html(surname + " ");
        $(span_name).html(name + " ");
        $(span_pat).html(pat);
        $(td_group).html(group);
        $(td_role).html(role);

        exit();
    }

}

//Редактирование пользователя

$('.change').on('click', function() {
    let tr = this.parentNode.parentNode;
    let subname = tr.childNodes[1].childNodes[1].innerHTML;
    let name = tr.childNodes[1].childNodes[3].innerHTML;
    let pat = tr.childNodes[1].childNodes[5].innerHTML;
    let group = tr.childNodes[3].innerHTML;
    let role = tr.childNodes[5].innerHTML;

    $('.creare').html('Редактировать');
    $('.create').attr('onclick', 'chang()');

    n_user();

    $('.input-surname').val(subname);
    $('.input-name').val(name);
    $('.input-patronymic').val(pat);
    $('.group-p2').html(group);

    if (role == 'Учитель') {
        $('#role2').click();
    }else if (role == 'Администратор') {
        $('#role3').click();
    }

});
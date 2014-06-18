$(function () {
   $('form').on('ajax:success', function () {
       $.cookie('username', $(this).find('input').val(), { expires: 365, path: '/' });
       location.href = '/level1';
   });
});
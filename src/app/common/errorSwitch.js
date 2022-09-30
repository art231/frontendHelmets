export let getErrorString = (status) => {
    switch (status) {
        case 200:
            return "ОК";
        case 204:
            // location.replace('/');
            return "Нет данных";
        case 422:
            return status;
        case 400:
            return "Введены неправильные данные";
        case 401:
            return "Запрос не авторизован";
        case 404:
            // location.reload();
            return "Старая версия приложения. Обновите страницу";
        case 500:
            return "Ошибка на сервере";
        default:
            return "Непредвиденная ошибка";
    }
};

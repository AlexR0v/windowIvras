import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
	//получаем элементы форм
	const form = document.querySelectorAll('form');
	const input = document.querySelectorAll('input');
	//ввод только цифр в поле с телефоном
	checkNumInputs('input[name="user_phone"]');
	//создаем объект с сообщениями пользователю
	const message = {
		loading:'Загрузка....' ,
		success:'Спасибо! Скоро мы с вами свяжемся' ,
		failure:'Что-то пошло не так...'
	};
	//создаем функцию отправки сообщений на сервер
	const postData = async(url , data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url , {
			method:'POST' ,
			body:data
		});
		return await res.text();
	};
	//очищаем инпуты
	const clearInputs = () => {
		input.forEach(item => {
			item.value = '';
		})
	}
	//работаем с формами
	form.forEach(item => {
		item.addEventListener('submit' , (evt) => {
			evt.preventDefault();
			//выводим сообщение пользователю
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);
			//собираем все данные из формы
			const formData = new FormData(item);
			if(item.getAttribute('data-calc') === 'end'){
				for(let key in state){
					formData.append(key , state[key]);
				}
			}
			//отправляем сообщение на сервер
			postData('assets/server.php' , formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.success;
				})//отлавливаем события ошибки
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {//убираем сообщение пользователю
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					} , 5000);
				})
		});
	});
};
export default forms;
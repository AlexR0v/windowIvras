const forms = () =>{
	//получаем элементы форм
	const form = document.querySelectorAll('form');
	const input = document.querySelectorAll('input');
	const phoneInput = document.querySelectorAll('input[name="user_phone"]');
	//ввод только цифр в поле с телефоном
	phoneInput.forEach(item =>{
		item.addEventListener('input', () =>{
			item.value = item.value.replace(/\D/, '');
		});
	});
	//создаем объект с сообщениями пользователю
	const message = {
		loading: 'Загрузка....',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};
	//создаем функцию отправки сообщений на сервер
	const postData = async (url, data)=>{
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});
		return await res.text();
	};
	//очищаем инпуты
	const clearInputs = () =>{
		input.forEach(item =>{
			item.value = '';
		})
	}
	//работаем с формами
	form.forEach(item =>{
		item.addEventListener('submit', (evt)=>{
			evt.preventDefault();
			//выводим сообщение пользователю
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);
			//собираем все данные из формы
			const formData = new FormData(item);
			//отправляем сообщение на сервер
			postData('assets/server.php', formData)
				.then(res =>{
					console.log(res);
					statusMessage.textContent = message.success;
				})//отлавливаем события ошибки
				.catch(()=> statusMessage.textContent = message.failure)
				.finally(()=>{//убираем сообщение пользователю
					clearInputs();
					setTimeout(()=>{
						statusMessage.remove();
					}, 5000);
				})
		});
	});
};
export default forms;
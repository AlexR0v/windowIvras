const tabs = (headerSelector , tabSelector , contentSelector , activeClaas) => {
	const header = document.querySelector(headerSelector);
	const tab = document.querySelectorAll(tabSelector);
	const content = document.querySelectorAll(contentSelector);

	const hideTabContent = () => {
		content.forEach(item => {
			item.style.display = 'none';
		})

		tab.forEach(item => {
			item.classList.remove(activeClaas);
		})
	}

	function showTabContent(i = 0){
		content[i].style.display = 'block';
		tab[i].classList.add(activeClaas);
	}

	hideTabContent();
	showTabContent();

	header.addEventListener('click' , (evt) => {
		const target = evt.target;
		if(target &&
			(target.classList.contains(tabSelector.replace(/\./ , '')) ||
				target.parentNode.classList.contains(
					tabSelector.replace(/\./ , '')))){
			tab.forEach((item , i) => {
				if(target == item || target.parentNode == item){
					hideTabContent();
					showTabContent(i);
				}
			})
		}
	})
}

export default tabs;
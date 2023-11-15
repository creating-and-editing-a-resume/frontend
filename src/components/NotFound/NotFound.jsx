import React from 'react'
import './NotFound.scss'
import NotFoundImage from '../../stories/assets/404.png'
import Header from '../../stories/Header'

export default function NotFound() {
	return (
		<section>
			<Header />
			<div className="error">
				<img className="error__image" alt="404" src={NotFoundImage} />
				<p className="error__subtitle">
					Извините, запрашиваемая страница не найдена. Возможно, она
					перемещена, удалена или вы ввели неверный адрес.
				</p>
			</div>
		</section>
	)
}

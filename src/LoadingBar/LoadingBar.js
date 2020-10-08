import React from 'react'

import './index.css'

export default function LoadingBar(props) {
	const { loading } = props;
	
	return (
		<div className={`loading-bar ${loading ? '' : 'disabled'}`}></div>
	)
}

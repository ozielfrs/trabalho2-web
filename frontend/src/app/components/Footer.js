import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { BiCodeCurly } from 'react-icons/bi'

const Footer = () => {
	return (
		<>
			<div className="container">
				<footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
					<div className="col mb-3">
						<a
							href="/"
							className="d-flex align-items-center mb-3 link-dark text-decoration-none">
							<BiCodeCurly color="#7289da" size={'md'} />
						</a>
						<p className="text-muted">© 2022</p>
					</div>

					<div className="col mb-3"></div>

					<div className="col mb-3">
						<h5>Oziel Ferreira</h5>
						<ul className="nav flex-column d-flex align-items-center">
							<li className="nav-item mb-2">
								<a
									href="https://github.com/ozielfrs"
									className="nav-link p-0 text-muted">
									<BsGithub />
								</a>
							</li>
							<li className="nav-item mb-2">
								<a
									href="https://www.linkedin.com/in/ozielfrs"
									className="nav-link p-0 text-muted">
									<BsLinkedin />
								</a>
							</li>
						</ul>
					</div>

					<div className="col mb-3">
						<h5>Willian Luiz</h5>
						<ul className="nav flex-column d-flex align-items-center">
							<li className="nav-item mb-2">
								<a
									href="https://github.com/willian13luiz"
									className="nav-link p-0 text-muted">
									<BsGithub />
								</a>
							</li>
							<li className="nav-item mb-2">
								<a
									href="https://www.linkedin.com/in/willian-luiz"
									className="nav-link p-0 text-muted">
									<BsLinkedin />
								</a>
							</li>
						</ul>
					</div>

					<div className="col mb-3">
						<h5>Celomar Filho</h5>
						<ul className="nav flex-column d-flex align-items-center">
							<li className="nav-item mb-2">
								<a
									href="https://github.com/ozielfrs/trabalho2-web"
									className="nav-link p-0 text-muted">
									<BsGithub />
								</a>
							</li>
							<li className="nav-item mb-2">
								<a
									href="https://github.com/ozielfrs/trabalho2-web"
									className="nav-link p-0 text-muted">
									<BsLinkedin />
								</a>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		</>
	)
}

export default Footer

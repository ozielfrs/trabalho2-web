import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { BiCodeCurly } from 'react-icons/bi'

const Footer = () => {
	return (
		<>
			<div class="container">
				<footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
					<div class="col mb-3">
						<a
							href="/"
							class="d-flex align-items-center mb-3 link-dark text-decoration-none">
							<BiCodeCurly color="#7289da" size={'md'} />
						</a>
						<p class="text-muted">© 2022</p>
					</div>

					<div class="col mb-3"></div>

					<div class="col mb-3">
						<h5>Oziel Ferreira</h5>
						<ul class="nav flex-column d-flex align-items-center">
							<li class="nav-item mb-2">
								<a href="https://github.com/ozielfrs" class="nav-link p-0 text-muted">
									<BsGithub />
								</a>
							</li>
							<li class="nav-item mb-2">
								<a
									href="https://www.linkedin.com/in/ozielfrs"
									class="nav-link p-0 text-muted">
									<BsLinkedin />
								</a>
							</li>
						</ul>
					</div>

					<div class="col mb-3">
						<h5>Willian Luiz</h5>
						<ul class="nav flex-column d-flex align-items-center">
							<li class="nav-item mb-2">
								<a
									href="https://github.com/willian13luiz"
									class="nav-link p-0 text-muted">
									<BsGithub />
								</a>
							</li>
							<li class="nav-item mb-2">
								<a
									href="https://www.linkedin.com/in/willian-luiz"
									class="nav-link p-0 text-muted">
									<BsLinkedin />
								</a>
							</li>
						</ul>
					</div>

					<div class="col mb-3">
						<h5>Celomar Filho</h5>
						<ul class="nav flex-column d-flex align-items-center">
							<li class="nav-item mb-2">
								<a
									href="https://github.com/ozielfrs/trabalho2-web"
									class="nav-link p-0 text-muted">
									<BsGithub />
								</a>
							</li>
							<li class="nav-item mb-2">
								<a
									href="https://github.com/ozielfrs/trabalho2-web"
									class="nav-link p-0 text-muted">
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

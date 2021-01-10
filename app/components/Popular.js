import React from "react";
import PropType from "prop-types";
import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";

function LanguageNav({selected, onUpdateLanguage}) {
	const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
	return (
		<ul className="flex-center">
			{languages.map((language, idx) => (
				<li key={idx}>
					<button
						className="btn-clear nav-link"
						style={
							language === selected
								? { color: "rgb(187, 46,31" }
								: null
						}
						onClick={() => onUpdateLanguage(language)}
					>
						{language}
					</button>
				</li>
			))}
		</ul>
	);
}

LanguageNav.propTypes = {
	selected : PropType.string.isRequired,
	onUpdateLanguage: PropType.func.isRequired
}

function ReposGrid ({repos}) {
	return (
		<ul className='grid space-around'>
			{repos.map((repo, idx) => {
				const {name, owner, html_url, stargazers_count, forks, open_issues} = repo;
				const { login, avatar_url } = owner;
				return (
					<Card
						header={`#${idx + 1}`}
						avatar={avatar_url}
						href={html_url}
						name={login}
					>
						<ul className="card-list">
							<li>
								<FaUser color="rgb(255, 191, 116)" size={22} />
								<a href={`http://github.com/${login}`}>{login}</a>
							</li>
							<li>
								<FaStar color="rgb(255, 215, 0)" size={22} />
								{stargazers_count.toLocaleString()} stars
							</li>
							<li>
								<FaCodeBranch color="rgb(129, 195, 245)" size={22} />
								{forks.toLocaleString()} forks
							</li>
							<li>
								<FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
								{open_issues.toLocaleString()} open open_issues
							</li>
						</ul>
					</Card>
				)
			})}
		</ul>
	)
}

ReposGrid.propTypes = {
	repos: PropType.array.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			selectedLanguage: "All",
			error: null,
			repos: {}
    };
		this.updateLanguage = this.updateLanguage.bind(this);
		this.isLoading = this.isLoading.bind(this);
  }

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

  updateLanguage(selectedLanguage) {
		this.setState({ 
			selectedLanguage,
			error: null
		});
		if(!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
			.then((data) => {
				this.setState(({repos}) => ({
					repos: { ...repos, [selectedLanguage]:data}
				}))
			})
			.catch(() => {
				console.warn("Error fetching repos: ", error);
				this.setState({error: `There was an error fetching the repositories`});
			})
		}
		
		
	}

	isLoading() {
		const {selectedLanguage, repos, error } = this.state;

		return !repos[selectedLanguage] && error === null;
	}

  render() {
		const {selectedLanguage, repos, error } = this.state;

    return (
			<React.Fragment>
				<LanguageNav 
				selected={this.state.selectedLanguage} 
				onUpdateLanguage={this.updateLanguage}/>
				
				{this.isLoading() && <Loading text={"Fetching repos"} />}			
				{error && <p className="center-text error">{error}</p>}
				{repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
			</React.Fragment>
		);
  }
}



export default Popular;

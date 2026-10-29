import {useState} from "react";
import styles from "./App.module.css";

function App() {
    const genres = ["액션", "코미디", "드라마", "SF", "공포", "멜로"];
    const ratings = ["5", "4", "3", "2", "1"];

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState(genres[0]);
    const [rating, setRating] = useState(ratings[0]);

    const [movies, setMovies] = useState([]);

    const handleChangeTitle = (event) => setTitle(event.target.value);

    const handleChangeGenre = (event) => setGenre(event.target.value);

    const handleChangeRating = (event) => setRating(event.target.value);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        // 저장하지 말아야 되는 상황에 대한 처리
        const parseTitle = title.trim();
        if (parseTitle === "") {
            return;
        }

        const newMovie = {
            title: parseTitle,    // key와 value의 스펠링이 달라서 써줘야 됨
            genre,                // key와 value의 스펠링이 같으면 생략 가능
            rating,
            watched: false,
        }

        setMovies([...movies, newMovie]);
        setTitle("");
        setGenre(genres[0]);
        setRating(ratings[0]);
    }

    const handleToggleWatched = (index) => {
        // setMovies를 통해 새로운 배열을 저장해야 하니까
        const newMovies = movies.map((movie, i) => {
            if (index !== i) {
                return movie;
            }
            return {...movie, watched: !movie.watched};
        });
        setMovies(newMovies);
    }

    const handleDelete = (index) => {
        const newMovies = movies.filter((movie, i) => i !== index);
        setMovies(newMovies);
    }

    // const totalWatched = movies.filter((movie) => movie.watched).length;
    const totalWatched = movies.reduce((sum, item) => {
        return item.watched ? sum + 1 : sum
    }, 0);

    return <div className={styles.container} >
        <h2 className={styles.title}>Favorite Movie</h2>
        <fieldset>
            <legend className={styles.legend}>영화 추가</legend>
            <form onSubmit={handleOnSubmit} className={styles.form}>
                <input className={styles.input}
                    placeholder={"영화 제목"}
                    onChange={handleChangeTitle}
                    value={title}
                />
                <select
                    className={styles.select}
                    onChange={handleChangeGenre}
                    value={genre}>
                    {genres.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })}
                </select>
                <select className={styles.select}
                    onChange={handleChangeRating}
                    value={rating}
                >
                    {ratings.map((item, index) => {
                        return <option key={index} value={item}>별점 {item}점</option>
                    })}
                </select>
                <button type={"submit"} className={styles.addButton}>추가</button>
            </form>
        </fieldset>
        <h3 className={styles.summaryText}>전체 {movies.length}편 / 감상 완료 {totalWatched}편</h3>
        <div className={styles.movieList}>
            {movies.map((item, index) => {
                // let stars = "";
                // if (item.rating === "5") {
                //     stars = "★★★★★";
                // } else if (item.rating === "4") {
                //     stars = "★★★★☆";
                // } else if (item.rating === "3") {
                //     stars = "★★★☆☆";
                // } else if (item.rating === "2") {
                //     stars = "★★☆☆☆";
                // } else {
                //     stars = "★☆☆☆☆";
                // }

                // repeat(숫자) 메서드 : 제공된 string을 숫자만큼 반복

                return (
                    <div
                        key={index}
                        className={styles.movieCard}
                        style={{opacity: item.watched ? 0.5 : 1,
                    }}>
                        <h4 style={{ margin: "0 0 8px"}}>{item.title}</h4>
                        <div>장르: {item.genre}</div>
                        <div className={styles.stars}
                        >{"★".repeat(Number(item.rating)) + "☆".repeat(5 - Number(item.rating))}</div>
                        <label>
                            <input
                                type={"checkbox"}
                                checked={item.watched}
                                onChange={
                                    // 값을 바꿔야 되는 대상이 input이 아니라 목록 안에 있는 항목의 watched니까
                                    // 이용해야 되는 값이 index임 => 매개변수로 제공이 되어야 된다는 뜻
                                    () => {
                                        handleToggleWatched(index);
                                    }
                                }
                            /> 감상완료
                        </label>
                        <div>
                            <button onClick={
                                        // 몇 번의 항목을 삭제 해달라
                                        // 인덱스 번호가 필요함
                                        () => {
                                            handleDelete(index);
                                        }
                                    }>삭제
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
}

export default App;
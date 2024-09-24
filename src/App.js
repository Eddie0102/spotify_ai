import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Recommendation from './Recommendation';

const CLIENT_ID = 'ff67089947b9415c9f1b328d292e730a';
const CLIENT_SECRET = '613575eb46604b058cc911812115ebdb';

function App() {
    console.log(CLIENT_ID, CLIENT_SECRET);
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);
    // 입력값의 변화를 저장하는 useState, default는 빈값

    useEffect(() => {
        // API Access Token
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
            // Client_Id와 Client_Secert 으로  Access Token을 호출
        };
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then((result) => result.json())
            .then((data) => setAccessToken(data.access_token));
        // 응답받은 Access Token을 Access Token의 상태를 저장하는 useState에 저장 (setAccessToken)
    }, []);

    // Search

    async function search() {
        console.log('Search for ' + searchInput); //Taylor Swift

        // Get 요청 - 검색어를 사용하여 아티스트 정보 호출하는 곳
        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
        };
        const artistID = await fetch(
            'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
            searchParameters
        )
            .then((response) => response.json())
            .then((data) => {
                return data.artists.items[0].id;
            });

        console.log('Artist ID is ' + artistID);
        // Get 요청 - 아티스트 ID로 해당 아티스트의 모든 앨범 정보 호출하는 곳
        const returnedAlbums = await fetch(
            'https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50',
            searchParameters
        )
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.items);
            });

        // 사용자에게 응답 받은 앨범 정보 뿌리기
    }
    console.log(albums);
    return (
        <div className="App">
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search For Artist"
                        type="input"
                        onKeyPress={(event) => {
                            if (event.key == 'Enter') {
                                console.log('Pressed enter');
                                search();
                            }
                        }}
                        onChange={(evnet) => setSearchInput(evnet.target.value)}
                    />
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-6">
                    {albums.map((album, i) => {
                        console.log(album);
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: '600', fontSize: '19px' }}>
                                        | 앨범명 |
                                        <br /> <p style={{ fontWeight: '400', fontSize: '18px' }}>{album.name}</p>
                                    </Card.Title>
                                    <br />
                                    <Card.Title style={{ fontWeight: '600', fontSize: '19px' }}>
                                        | 아티스트명 |
                                        <br /> <p style={{ fontWeight: '400', fontSize: '18px' }}>{searchInput}</p>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default App;

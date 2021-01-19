// https://www.youtube.com/watch?v=-MlNBTSg_Ww&list=PLWano87cQydOC2AFncY5N18n3yvl_8HhA&index=5&t=0s
// Time: 34:00

import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log('Rendering...');

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' + props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.dev/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleaning up...');
    };
  }, [props.selectedChar]);

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);

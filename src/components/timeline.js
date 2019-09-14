import React, { Component } from 'react';
import Photo from './photo';

export default class Timeline extends Component {

  constructor(props) {
    super(props)
    this.state = { photos: [] };
  }
  

  componentDidMount() {
    const token = localStorage.getItem('authToken');
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`)
      .then(res => res.json())
      .then(photos => this.setState({ photos }));
  }

  render() {
    return (
      <div className="fotos container">
        { this.state.photos.map(photo => <Photo key={photo.id} photo={photo} />) }
      </div>
    );
  }
}

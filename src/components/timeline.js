import React, { Component } from 'react';
import Photo from './photo';

export default class Timeline extends Component {

  constructor(props) {
    super(props)
    this.state = { photos: [] };
  }
  
  componentDidMount() {
    this._loadPhotos(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this._loadPhotos(nextProps);
  }

  _loadPhotos(props) {
    const token = localStorage.getItem('authToken');
    let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`;
    if (props.login && props.login.length)
      url = `http://localhost:8080/api/public/fotos/${props.login}`;

    fetch(url)
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Card, CardTitle, CardText, Slider, Media } from 'react-md';


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { getMovies } = this.props.actions
    try {
      getMovies()
    } catch (error) {
      console.log('pas bon');
      
    }
  }
  render() {
    return (
      <div className="home-default-page">
        <div className="md-grid">
          {this.props.home.popularMovie.results ? this.props.home.popularMovie.results.map((item,i) =>
              <Card style={{maxWidth: 320}} className="md-cell">
                <Media>
                  <img src={"http://image.tmdb.org/t/p/w185"+item.poster_path} alt="Nature from lorempixel" />
                </Media>
              <CardTitle title={item.title} subtitle="With CardText" />
              <CardText>
                <p>
                  {item.overview}
                </p>
              </CardText>
            </Card>
            ) : ''}
          </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);

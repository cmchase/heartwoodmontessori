"use strict"
var React = require('react');
var EventListItem = require('./eventListItem') 
var EventList = React.createClass({
  componentWillMount: function () {
    if (typeof window === 'undefined') {
        return;
    }
    window.eventListCallback = function() {
      var set = function(val) {
        this.setState({ events: val})
      }.bind(this);

      this.setState({
          events: gapiClient.listUpcomingEvents(5, set)
      });
    }.bind(this);
  },
  getInitialState: function() {
    return {
      events: []
    }
  },
  render: function(){
    var events = this.state.events;
    var eventItems = [];
    if (typeof events === 'undefined' || events.length === 0) {
      console.log('no events')
      return (<div className="loading"></div>);
    } else {
      for (var i = 0; i < events.length; i++){
        var event = events[i];
        eventItems.push(<EventListItem key={event.etag} event={event} />);
      }
      return (
        <div>
          <ul className="activity-list">
            {eventItems}
          </ul>
          <a href="#" className="activity-more">
            <span className="icon"></span>View All Events
          </a>
        </div>
      );
    };    
  }
});


module.exports = EventList;
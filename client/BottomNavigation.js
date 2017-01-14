import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const userGuide = <FontIcon className="material-icons">User Guide</FontIcon>;
const bugReport = <FontIcon className="material-icons">Report Bugs</FontIcon>;

export default class BottomNavigationLink extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    const reportLink = `https://github.com/GuildCrafts/coach-que/issues`
    const guideLink = `https://github.com/GuildCrafts/coach-que/blob/master/USERGUIDE.md`
    return (
      <div className="BottomNavigationLink">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Start Here"
              icon={userGuide}
              href={guideLink}
              onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Issues"
              icon={bugReport}
              href={reportLink}
              onTouchTap={() => this.select(1)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

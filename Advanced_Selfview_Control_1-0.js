import xapi from 'xapi';

// Set Selfview Position function
async function setSelfviewPosition(selfviewPosition) {
  try {
    await xapi.Command.Video.Selfview.Set( {
      PIPPosition: selfviewPosition,
    });
  } catch (error) {
    console.error('Not able to set Selfview Position with error:' + error);
  }
}

// Set Selfview Mode function
async function setSelfviewMode(selfviewMode) {
  try {
    await xapi.Command.Video.Selfview.Set( {
      Mode: selfviewMode,
    });
  } catch (error) {
    console.error('Not able to set Selfview Mode with error:' + error);
  }
}

// Set Selfview Fullscreen function
async function setSelfviewFullscreen(selfviewFullscreen) {
  try {
    await xapi.Command.Video.Selfview.Set( {
      FullscreenMode: selfviewFullscreen,
    });
  } catch (error) {
    console.error('Not able to set Selfview Fullscreen with error:' + error);
  }
}

// Set Selfview On Monitor function
async function setSelfviewOnMonitor(selfviewOnMonitor) {
  try {
    await xapi.Command.Video.Selfview.Set( {
      OnMonitorRole: selfviewOnMonitor,
    });
  } catch (error) {
    console.error('Not able to set Selfview Mode with error:' + error);
  }
}

async function setSelfviewGUI(modeUI, fullscreenModeUI, onMonitorUI, positionUI) {
  try {
    await xapi.Command.UserInterface.Extensions.Widget.SetValue( { WidgetId: 'show_selfview', Value: modeUI } );
    await xapi.Command.UserInterface.Extensions.Widget.SetValue( { WidgetId: 'fullscreen_selfview', Value: fullscreenModeUI } );
    await xapi.Command.UserInterface.Extensions.Widget.SetValue( { WidgetId: 'selfview_on_monitor', Value: onMonitorUI } );
    await xapi.Command.UserInterface.Extensions.Widget.SetValue( { WidgetId: 'selfview_position', Value: positionUI } );
    
    //console.log('In setSelfviewGUI function: ' + modeUI + ', ' + fullscreenModeUI + ', ' + onMonitorUI + ', ' + positionUI);

  } catch (error) {
    console.error('Not able to set Selfview UI Value with error:' + error);
  }
}

async function updatingSelfviewConfig() {
  try {
    var modeUI = await xapi.Status.Video.Selfview.Mode.get();
    //console.log('Update Mode UI: ' + modeUI);
    var fullscreenModeUI = await xapi.Status.Video.Selfview.FullscreenMode.get();
    //console.log('Update Mode UI: ' + fullscreenModeUI);
    var onMonitorUI = await xapi.Status.Video.Selfview.OnMonitorRole.get();
    //console.log('Update Mode UI: ' + onMonitorUI);
    var positionUI = await xapi.Status.Video.Selfview.PIPPosition.get();
    //console.log('Update Mode UI: ' + positionUI);

    setSelfviewGUI(modeUI, fullscreenModeUI, onMonitorUI, positionUI);

  } catch (error) {
    console.error('Not able to get Selfview Fullscreen Value with error:' + error);
  }
}

function init() {
  xapi.Event.UserInterface.Extensions.Panel.Clicked.on((event) => {
    if(event.PanelId == 'selfview_panel') {
      //console.log('Panel is Clicked');
      updatingSelfviewConfig();
    }
  });
  
  xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
    if(event.Type =='changed') {
      switch(event.WidgetId) { // Input for Selfview Mode On/Off
        case 'show_selfview':
          if(event.Value == 'on') {
            var selfviewMode = "On";
            console.log('Show Selfview: ' + selfviewMode);
            setSelfviewMode(selfviewMode);       
          }
          else {
            var selfviewMode = "Off";
            console.log('Show Selfview: ' + selfviewMode);
            setSelfviewMode(selfviewMode);
          }
          break;
        case 'fullscreen_selfview':
          if(event.Value == 'on') {
            var selfviewFullscreen = "On";
            console.log('Show Selfview: ' + selfviewFullscreen);
            setSelfviewFullscreen(selfviewFullscreen);       
          }
          else {
            var selfviewFullscreen = "Off";
            console.log('Show Selfview: ' + selfviewFullscreen);
            setSelfviewFullscreen(selfviewFullscreen);
          } 
      }
    }
    else if (event.Type == 'released') {
      switch(event.WidgetId) {
        case 'selfview_on_monitor':
          switch(event.Value) {
            case 'First':
              var selfviewOnMonitor = event.Value;
              console.log('On Monitor:' + selfviewOnMonitor);
              setSelfviewOnMonitor(selfviewOnMonitor);
              break;
            case 'Second':
              var selfviewOnMonitor = event.Value;
              console.log('On Monitor:' + selfviewOnMonitor);
              setSelfviewOnMonitor(selfviewOnMonitor);
              break;
            case 'Third':
              var selfviewOnMonitor = event.Value;
              console.log('On Monitor:' + selfviewOnMonitor);
              setSelfviewOnMonitor(selfviewOnMonitor);
              break;
          }
          break;
        case 'selfview_position':
          switch(event.Value) {
            case 'UpperLeft':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break;
            case 'UpperCenter':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break;
            case 'UpperRight':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break;
            case 'CenterLeft':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break;
            case 'CenterCenter':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              updatingSelfviewConfig();
              break;
            case 'CenterRight':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break; 
            case 'LowerLeft':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break; 
            case 'LowerCenter':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              updatingSelfviewConfig();
              break; 
            case 'LowerRight':
              var selfviewPosition = event.Value;
              //console.log('Selfview Position:' + selfviewPosition);
              setSelfviewPosition(selfviewPosition);
              break;
          }
          break;
      }
    }
  });

  updatingSelfviewConfig();
}

init();
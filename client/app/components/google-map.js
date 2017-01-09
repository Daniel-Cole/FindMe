import Ember from 'ember';

export default Ember.Component.extend({
    insertMap: function() {
        var options = {
            center: new window.google.maps.LatLng(-41.294123,
                174.777737
            ),
            zoom: 15,
            disableDefaultUI: true
        };
        var map = new google.maps.Map(document.getElementsByClassName('map-canvas')[0], options);
        var mapOptionsControl = this.createOptionsControl(map);
        var mapSearchControl = this.createSearchControl(map);
        var mapCenterControl = this.createCenterControl(map);
        var mapRefreshControl = this.createRefreshControl(map);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapOptionsControl);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapSearchControl);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mapCenterControl);
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(mapRefreshControl);

        //create a search icon in center to search for people
        //create a center icon on right 
        //glyphicon glyphicon-screenshot
        //glyphicon glyphicon-search
    }.on('didInsertElement'),

    createOptionsControl: function(map) {
        // Create a div to hold the control.
        var controlDiv = document.createElement('div');
        // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.marginTop = '5px';
        controlUI.style.marginLeft = '5px';
        controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span></button>'
        controlDiv.appendChild(controlUI);

        this.sendAction('action', 'options', controlUI);

        return controlDiv;
    },
    createSearchControl: function(map) {
        var controlDiv = document.createElement('div');
        // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.marginTop = '5px';
        controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>'
        controlDiv.appendChild(controlUI);
        this.sendAction('action', 'search', controlUI, map);

        return controlDiv;
    },
    createCenterControl: function(map) {
        var controlDiv = document.createElement('div');
        // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.marginTop = '5px';
        controlUI.style.marginRight = '5px';
        controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-screenshot" aria-hidden="true"></span></button>'
        controlDiv.appendChild(controlUI);

        this.sendAction('action', 'center', controlUI);

        return controlDiv;
    },
    createRefreshControl: function(map) {
        var controlDiv = document.createElement('div');
        // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.marginBottom = '5px';
        controlUI.style.marginRight = '5px';
        controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>'
        controlDiv.appendChild(controlUI);

        this.sendAction('action', 'refresh', controlUI);

        return controlDiv;
    }
});
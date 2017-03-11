import React, { Component } from 'react';
import AddField from './AddField';
import EditField from './EditField';
import FormSettings from './FormSettings';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "AddField"
        };
        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(tabName) {
        if (this.props.onTabClick) {
            this.props.onTabClick(tabName);
        }
    }

    render() {
        return (
            <div className="control-panel">
                <ul className="nav nav-tabs">
                    <li role="presentation" className={this.props.activeTab === 'AddField' ? 'active' : ''}><a href="#" onClick={() => this.selectTab('AddField')}>Add a Field</a></li>
                    <li role="presentation" className={this.props.activeTab === 'EditField' ? 'active' : ''}><a href="#" onClick={() => this.selectTab('EditField')}>Field Settings</a></li>
                    <li role="presentation" className={this.props.activeTab === 'FormSettings' ? 'active' : ''}><a href="#" onClick={() => this.selectTab('FormSettings')}>Form Settings</a></li>
                </ul>
                <AddField 
                    active={this.props.activeTab === 'AddField'} 
                    availableFieldTypes={this.props.availableFieldTypes}
                    onFieldCreate={this.props.onFieldCreate}
                />
                <EditField 
                    active={this.props.activeTab === 'EditField'} 
                    fieldBeingEdited={this.props.fieldBeingEdited}
                    availableFieldTypes={this.props.availableFieldTypes}
                    onFieldUpdate={this.props.onFieldUpdate}
                    onFieldDelete={this.props.onFieldDelete}
                />
                <FormSettings 
                    active={this.props.activeTab === 'FormSettings'}
                    formData={this.props.formData}
                    handleFormSettingUpdate={this.props.handleFormSettingUpdate}
                />
            </div>
        )
    }

}

export default ControlPanel;
import React, { Component } from 'react';

class SubmissionRules extends Component {

    ruleClassNames = ["Email", "CustomerServiceIssue"];
    rules = [];

    newSubmissionRuleName;

    constructor(props) {
        super(props);
        this.state = {
            view: "list"
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleNewRule = this.handleNewRule.bind(this);

        this.ruleClassNames.forEach((name) => {
            let classObject = require("../../submissionHandlers/" + name).default;
            this.rules[name] = new classObject();
        });
    }

    handleClose() {
        this.props.onClose();
        this.setState({
            view: "list"
        });

        this.editRule = this.editRule.bind(this);
    }

    editRule(ruleName) {
        this.setState({
            view: "edit",
            ruleBeingEdited: ruleName
        });
    }

    getFriendlyNameForRule(ruleName) {
        let rule = this.rules[ruleName];
        return rule.getFriendlyName();
    }

    handleNewRule(event) {
        event.preventDefault();
        console.log(this.newSubmissionRuleName);
    }

    render() {

        let content = this.state.view === "list" ? this.renderListOfRules() : this.renderRuleEditor();

        return (
            <div className={!this.props.enabled ? "hidden" : ""}>
                <div className="overlay-background" onClick={this.handleClose}></div>
                <div className="overlay-content">{content}</div>
            </div>
        )
    }

    renderListOfRules() {
        let savedRules = this.props.formData.submissionHandlers;
        if (!savedRules) {
            return null;
        }

        savedRules = savedRules.map((rule) => {
            let friendlyName = this.getFriendlyNameForRule(rule.name);
            return <tr key={rule.name}>
                        <td>{friendlyName}</td>
                        <td><button className="btn" onClick={() => this.editRule(rule.name)}>Edit</button></td>
                    </tr>
        });

        let newRulesOptions = this.ruleClassNames.map((ruleName) => {
            let friendlyName = this.getFriendlyNameForRule(ruleName);
            return <option key={ruleName} value={ruleName}>{friendlyName}</option>
        });
        newRulesOptions.unshift(<option key="addnew">Add new rule</option>);

        return (
            <div>
                <table className="table">
                    <tbody>
                        {savedRules}
                    </tbody>
                </table>
                <form className="form-inline" onSubmit={this.handleNewRule}>
                    <div className="form-group">
                        <select className="form-control">
                            {newRulesOptions}
                        </select>&nbsp;
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        )
    }

    renderRuleEditor() {
        return (
            <p>Edit {this.state.ruleBeingEdited} <button className="btn btn-primary" onClick={() => this.setState({view: "list"})}>Lists</button></p>
        )
    }

}

export default SubmissionRules;
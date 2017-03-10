import React, { Component } from 'react';

import SubmissionRuleEditor from './SubmissionRuleEditor';

class SubmissionRules extends Component {

    ruleClassNames = ["Email", "CustomerServiceIssue"];
    rules = [];

    constructor(props) {
        super(props);
        this.state = {
            view: "list",
            nameOfRuleToCreate: "addnew"
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleNewRule = this.handleNewRule.bind(this);
        this.handleUpdateRule = this.handleUpdateRule.bind(this);

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
        if (this.state.nameOfRuleToCreate === 'addnew') {
            return false;
        }
        this.handleUpdateRule(this.state.nameOfRuleToCreate, {});
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
        let savedRules = this.props.formData.submissionHandlers || [];

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
                <h3>Submission Rules</h3>
                <table className={"table " + (savedRules.length === 0 ? "hidden" : "")}>
                    <tbody>
                        {savedRules}
                    </tbody>
                </table>
                <form className="form-inline" onSubmit={this.handleNewRule}>
                    <div className="form-group">
                        <select className="form-control" 
                            value={this.state.nameOfRuleToCreate}
                            onChange={(e) => this.setState({nameOfRuleToCreate: e.target.value})}>
                            {newRulesOptions}
                        </select>&nbsp;
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        )
    }

    handleUpdateRule(ruleName, ruleValues) {
        let updatedRules = this.props.formData.submissionHandlers || [];

        let ruleIdxToUpdate = undefined;
        let ruleToUpdate = updatedRules.filter((rule, idx) => {
            if (rule.name === ruleName) { //@TODO Refactor this to an id
                ruleIdxToUpdate = idx;
                return true;
            } else {
                return false;
            }
        });

        if (ruleToUpdate.length === 0) {
            updatedRules.push({name: ruleName, options: {}});
            this.editRule(ruleName);
        } else {
            updatedRules[ruleIdxToUpdate]['options'] = ruleValues;
        }
        this.props.onSubmissionRuleUpdate(updatedRules);
    }

    renderRuleEditor() {
        let rule = this.rules[this.state.ruleBeingEdited];
        let submissionHandlers = this.props.formData.submissionHandlers;
        let ruleValues;
        submissionHandlers.forEach((handler) => {
            if (handler.name === this.state.ruleBeingEdited) {
                ruleValues = handler.options;
            }
        });

        return (
            <SubmissionRuleEditor 
                rule={rule}
                ruleName={this.state.ruleBeingEdited}
                ruleValues={ruleValues} 
                formFields={this.props.formData.fields}
                onGoBack={() => this.setState({view: "list"})}
                onUpdateRule={this.handleUpdateRule}
            />
        )
    }

}

export default SubmissionRules;
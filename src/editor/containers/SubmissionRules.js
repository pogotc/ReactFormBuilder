import React, { Component } from 'react';

import SubmissionRuleEditor from './SubmissionRuleEditor';

class SubmissionRules extends Component {

    ruleClassNames = ["AddAttribute", "AddContribution", "Email", "CustomerServiceIssue", "Redirect"];
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
        this.deleteRule = this.deleteRule.bind(this);

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

    editRule(ruleId) {
        this.setState({
            view: "edit",
            ruleBeingEdited: ruleId
        });
    }

    deleteRule(ruleId) {
        if (confirm("Are you sure you want to delete this rule?")) {
            let updatedRules = this.props.formData.submissionHandlers.filter((rule) => {
                return rule.id !== ruleId;
            });
            this.props.onSubmissionRuleUpdate(updatedRules);
        }
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

        let newRule = {
            id: Math.floor(Math.random() * 10000),
            name: this.state.nameOfRuleToCreate,
            options: {}
        };

        let updatedRules = this.props.formData.submissionHandlers || [];
        updatedRules.push(newRule);
        this.props.onSubmissionRuleUpdate(updatedRules);
        this.editRule(newRule.id);
        this.setState({
            nameOfRuleToCreate: "addnew"
        });
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
            return <tr key={rule.id}>
                        <td>{friendlyName}</td>
                        <td><button className="btn" onClick={() => this.editRule(rule.id)}>Edit</button></td>
                        <td><button className="btn btn-danger" onClick={() => this.deleteRule(rule.id)}>Delete</button></td>
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

    handleUpdateRule(ruleId, ruleValues) {
        let updatedRules = this.props.formData.submissionHandlers || [];
        let ruleIdxToUpdate = undefined;
        let ruleToUpdate = updatedRules.filter((rule, idx) => {
            if (rule.id === ruleId) {
                ruleIdxToUpdate = idx;
                return true;
            } else {
                return false;
            }
        });

        if (ruleToUpdate.length !== 0) {
            updatedRules[ruleIdxToUpdate]['options'] = ruleValues;
        }
        this.props.onSubmissionRuleUpdate(updatedRules);
    }

    renderRuleEditor() {
        let submissionHandlers = this.props.formData.submissionHandlers;
        let ruleName = submissionHandlers.reduce((acc, curr) => {
            if (curr.id === this.state.ruleBeingEdited) {
                return curr.name;
            } else {
                return acc;
            }
        }, undefined);
        let rule = ruleName !== undefined ? this.rules[ruleName] : undefined;
        let ruleValues;
        submissionHandlers.forEach((handler) => {
            if (handler.id === this.state.ruleBeingEdited) {
                ruleValues = handler.options;
            }
        });

        return (
            <SubmissionRuleEditor 
                rule={rule}
                ruleId={this.state.ruleBeingEdited}
                ruleValues={ruleValues} 
                formFields={this.props.formData.fields}
                onGoBack={() => this.setState({view: "list"})}
                onUpdateRule={this.handleUpdateRule}
            />
        )
    }

}

export default SubmissionRules;
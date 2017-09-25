// @flow
/* The Mad Tooter -- A Mastodon client
 * Copyright (C) 2017  Gergely Nagy
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { showError } from '../../utils';

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit / 2,
        marginRight: theme.spacing.unit / 2,
    },
});

class AddAccount extends React.Component {
    state = {
        key: "",
        baseURI: "",
        username: "",
        password: "",

        submitted: false,
    }

    submitted = false;

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    isAllValid = (props) => {
        const settings = ['key', 'baseURI', 'username', 'password'];

        return settings.reduce((result, key) => { return result && this.isValid(key, props); });
    }

    handleRegister = self => e => {
        e.preventDefault();
        self.submitted = true;

        self.setState({submitted: true});

        if (self.isAllValid()) {
            self.props.onSubmit(self.state);
        } else {
            showError("Please make sure that the values in the form are valid.");
        }
    }

    isValid = (key, props = {force: false}) => {
        switch (key) {
        case 'key':
        case 'username':
        case 'password':
            if (!this.submitted && !props.force)
                return true;
            return this.state[key] !== "";

        case 'baseURI':
            if (!this.submitted && this.state.baseURI === "" && !props.force)
                return true;

            if (this.state.baseURI.startsWith('http://') ||
                this.state.baseURI.startsWith('https://'))
                return false;

            return this.state[key] !== "";

        default:
            return false;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Card style={{margin: '16px'}}>
              <CardContent>
                <form autoComplete="none" onSubmit={this.handleRegister(this)}>
                  <TextField required fullWidth autoFocus
                             error={!this.isValid('key')}
                             className={classes.textField}
                             id="mad-tooter-key"
                             label="Name of the account"
                             value={this.state.key}
                             placeholder="@username"
                             helperText="A name for this account, can be anything you choose."
                             onChange={this.handleChange('key')} />
                  <TextField required fullWidth
                             error={!this.isValid('baseURI')}
                             className={classes.textField}
                             id="mad-tooter-instance"
                             label="Instance URL"
                             value={this.state.baseURI}
                             placeholder="Eg: mastodon.social"
                             helperText="Your instance, without the protocol."
                             onChange={this.handleChange('baseURI')} />
                  <div>
                    <TextField required
                               error={!this.isValid('username')}
                               className={classes.textField}
                               id="mad-tooter-username"
                               label="E-mail address"
                               value={this.state.username}
                               placeholder="tooter@example.social"
                               helperText="The e-mail address you use to log in."
                               onChange={this.handleChange('username')} />
                    <TextField required
                               error={!this.isValid('password')}
                               className={classes.textField}
                               type="password"
                               id="mad-tooter-password"
                               label="Password"
                               value={this.state.password}
                               placeholder="12345"
                               helperText="The password you use to log in."
                               onChange={this.handleChange('password')} />
                  </div>
                </form>
              </CardContent>
              <CardContent>
                <Typography type="body1">
                  {`Credentials entered above are only used to obtain an authorization token. They
                    are not saved, or sent anywhere else but to the instance
                    provided above.`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={this.handleRegister(this)} color="primary"
                        disabled={!this.isAllValid({force: true})}>
                  Authorize
                </Button>
              </CardActions>
            </Card>
      );
    }
};

export default withStyles(styles)(AddAccount);

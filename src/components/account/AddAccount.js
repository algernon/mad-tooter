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
import Divider from 'material-ui/Divider';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
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
        accessToken: "",

        useToken: false,
        submitted: false,
    }

    submitted = false;

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    isAllValid = (props) => {
        const settings = ['key', 'baseURI', 'username', 'password', 'accessToken'];

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
            if (!this.submitted && !props.force)
                return true;
            return this.state[key] !== "";

        case 'username':
        case 'password':
            if (this.state.useToken)
                return true;
            if (!this.submitted && !props.force)
                return true;
            return this.state[key] !== "";

        case 'accessToken':
            if (!this.state.useToken)
                return true;
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

        let Credentials = (
            <div>
                    <TextField error={!this.isValid('username')}
                               className={classes.textField}
                               id="mad-tooter-username"
                               type="email"
                               label="E-mail address"
                               value={this.state.username}
                               placeholder="tooter@example.social"
                               helperText="The e-mail address you use to log in."
                               onChange={this.handleChange('username')} />
                    <TextField error={!this.isValid('password')}
                               className={classes.textField}
                               type="password"
                               id="mad-tooter-password"
                               label="Password"
                               value={this.state.password}
                               placeholder="12345"
                               helperText="The password you use to log in."
                               onChange={this.handleChange('password')} />
                    <Typography>
                      {`Credentials entered above are only used to obtain an authorization token. They
                        are not saved, or sent anywhere else but to the instance
                        provided above.`}
                    </Typography>

            </div>
        );
        if (this.state.useToken) {
            Credentials = (
                <div>
                  <TextField error={!this.isValid('accessToken')}
                             className={classes.textField}
                             type="password"
                             id="mad-tooter-auth-token"
                             label="Authorization token"
                             value={this.state.accessToken}
                             placeholder="1234-abcd-foobar"
                             helperText="If you registered the application beforehand, you can enter the authorization token here."
                             onChange={this.handleChange('accessToken')} />
                </div>
            );
        }

        return (
            <form autoComplete="none" onSubmit={this.handleRegister(this)}>
              <Card style={{margin: '16px'}}>
                <CardContent style={{paddingTop: 0}}>
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
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography>
                    {`You can log in either by using a username and password combination, or by supplying an authorization token.`}
                  </Typography>

                  <FormControlLabel
                    label="Use an authorization token"
                    control={<Switch checked={this.state.useToken}
                                     onChange={(event, checked) => this.setState({ useToken: checked })} />} />

                  {Credentials}
                </CardContent>
                <CardActions>
                  <Button onClick={this.handleRegister(this)} color="primary"
                          disabled={!this.isAllValid({force: true})}>
                    Authorize
                  </Button>
                </CardActions>
              </Card>

            </form>
      );
    }
};

export default withStyles(styles)(AddAccount);

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { MastodonAPI } from '../../mastodon/API'

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit / 2,
        marginRight: theme.spacing.unit / 2,
    },
});

class RegisterWizard extends React.Component {
    state = {
        key: "",
        baseURI: "",
        username: "",
        password: "",
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleRegister = self => e => {
        e.preventDefault();

        let api = new MastodonAPI(self.state.key, {api: {baseURL: 'https://' + self.state.baseURI}});
        api.register()
            .then((response) => {
                api.getAuthToken(response.data.client_id,
                                 response.data.client_secret,
                                 self.state.username,
                                 self.state.password)
                    .then((response) => {
                        let newConfig = {};
                        newConfig[self.state.key] = {
                            api: {baseURL: 'https://' + self.state.baseURI,
                                  wsBaseURL: 'wss://' + self.state.baseURI},
                            auth: {token: response.data.access_token}
                        }
                        window.localStorage.setItem("mastodon", JSON.stringify(newConfig));
                        self.props.onSuccess();
                    })
            })
    }

    render() {
        const classes = this.props.classes;

        return (
            <Dialog onRequestClose={this.handleRequestClose} open>
              <DialogTitle>
                Mad Tooter Setup Wizard
              </DialogTitle>
              <DialogContent>
                <form noValidate autoComplete="none" onSubmit={this.handleRegister(this)}>
                    <TextField required fullWidth
                               className={classes.textField}
                               id="mad-tooter-key"
                               label="Name of the account"
                               value={this.state.key}
                               placeholder="@username"
                               helperText="A name for this account, can be anything you choose"
                               onChange={this.handleChange('key')} />
                    <TextField required fullWidth
                               className={classes.textField}
                               id="mad-tooter-instance"
                               label="Instance URL"
                               value={this.state.baseURI}
                               placeholder="Eg: mastodon.social"
                               helperText="Your instance, without the protocol"
                               onChange={this.handleChange('baseURI')} />
                  <div>
                    <TextField required
                               className={classes.textField}
                               id="mad-tooter-username"
                               label="E-mail address"
                               value={this.state.username}
                               placeholder="tooter@example.social"
                               helperText="The e-mail address you use to log in to your instance"
                               onChange={this.handleChange('username')} />
                    <TextField required
                               className={classes.textField}
                               type="password"
                               id="mad-tooter-password"
                               label="Password"
                               value={this.state.password}
                               placeholder="12345"
                               helperText="The password you use to log in to your instance"
                               onChange={this.handleChange('password')} />
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRegister(this)} color="primary">
                  Authorize
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(RegisterWizard);

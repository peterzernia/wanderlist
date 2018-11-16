import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

class UpdateTripReportForm extends Component {

  constructor(props) {
    super(props);
    let countryList = props.modalPost.countries.map(country => country.id);
    this.state = {
      title: props.modalPost.title,
      content: props.modalPost.content,
      countries: countryList
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <TextField className="user-auth" type='text' name="title" label="Title" onChange={this.handleChange} value={this.state.title}/><br/>
        <TextField multiline fullWidth className="user-auth" type='text' name="content" label="Content" onChange={this.handleChange} value={this.state.content}/><br/>
        <InputLabel shrink htmlFor="countries">Countries</InputLabel><br/>
        <Select style={{ textAlign: 'left'}} multiple className="user-auth" name="countries" onChange={this.handleChange} value={this.state.countries}>
          <MenuItem value="1">Afghanistan</MenuItem>
          <MenuItem value="2">Åland Islands</MenuItem>
          <MenuItem value="3">Albania</MenuItem>
          <MenuItem value="4">Algeria</MenuItem>
          <MenuItem value="5">American Samoa</MenuItem>
          <MenuItem value="6">Andorra</MenuItem>
          <MenuItem value="7">Angola</MenuItem>
          <MenuItem value="8">Anguilla</MenuItem>
          <MenuItem value="9">Antarctica</MenuItem>
          <MenuItem value="10">Antigua and Barbuda</MenuItem>
          <MenuItem value="11">Argentina</MenuItem>
          <MenuItem value="12">Armenia</MenuItem>
          <MenuItem value="13">Aruba</MenuItem>
          <MenuItem value="14">Australia</MenuItem>
          <MenuItem value="15">Austria</MenuItem>
          <MenuItem value="16">Azerbaijan</MenuItem>
          <MenuItem value="17">Bahamas</MenuItem>
          <MenuItem value="18">Bahrain</MenuItem>
          <MenuItem value="19">Bangladesh</MenuItem>
          <MenuItem value="20">Barbados</MenuItem>
          <MenuItem value="21">Belarus</MenuItem>
          <MenuItem value="22">Belgium</MenuItem>
          <MenuItem value="23">Belize</MenuItem>
          <MenuItem value="24">Benin</MenuItem>
          <MenuItem value="25">Bermuda</MenuItem>
          <MenuItem value="26">Bhutan</MenuItem>
          <MenuItem value="27">Bolivia (Plurinational State of)</MenuItem>
          <MenuItem value="28">Bonaire, Sint Eustatius and Saba</MenuItem>
          <MenuItem value="29">Bosnia and Herzegovina</MenuItem>
          <MenuItem value="30">Botswana</MenuItem>
          <MenuItem value="31">Bouvet Island</MenuItem>
          <MenuItem value="32">Brazil</MenuItem>
          <MenuItem value="56">Cook Islands</MenuItem>
          <MenuItem value="33">British Indian Ocean Territory</MenuItem>
          <MenuItem value="34">United States Minor Outlying Islands</MenuItem>
          <MenuItem value="35">Virgin Islands (British)</MenuItem>
          <MenuItem value="36">Virgin Islands (U.S.)</MenuItem>
          <MenuItem value="37">Brunei Darussalam</MenuItem>
          <MenuItem value="38">Bulgaria</MenuItem>
          <MenuItem value="39">Burkina Faso</MenuItem>
          <MenuItem value="40">Burundi</MenuItem>
          <MenuItem value="41">Cambodia</MenuItem>
          <MenuItem value="42">Cameroon</MenuItem>
          <MenuItem value="43">Canada</MenuItem>
          <MenuItem value="44">Cabo Verde</MenuItem>
          <MenuItem value="45">Cayman Islands</MenuItem>
          <MenuItem value="46">Central African Republic</MenuItem>
          <MenuItem value="47">Chad</MenuItem>
          <MenuItem value="48">Chile</MenuItem>
          <MenuItem value="49">China</MenuItem>
          <MenuItem value="50">Christmas Island</MenuItem>
          <MenuItem value="51">Cocos (Keeling) Islands</MenuItem>
          <MenuItem value="52">Colombia</MenuItem>
          <MenuItem value="53">Comoros</MenuItem>
          <MenuItem value="54">Congo</MenuItem>
          <MenuItem value="55">Congo (Democratic Republic of the)</MenuItem>
          <MenuItem value="57">Costa Rica</MenuItem>
          <MenuItem value="58">Croatia</MenuItem>
          <MenuItem value="59">Cuba</MenuItem>
          <MenuItem value="60">Curaçao</MenuItem>
          <MenuItem value="61">Cyprus</MenuItem>
          <MenuItem value="62">Czech Republic</MenuItem>
          <MenuItem value="63">Denmark</MenuItem>
          <MenuItem value="64">Djibouti</MenuItem>
          <MenuItem value="65">Dominica</MenuItem>
          <MenuItem value="66">Dominican Republic</MenuItem>
          <MenuItem value="67">Ecuador</MenuItem>
          <MenuItem value="68">Egypt</MenuItem>
          <MenuItem value="69">El Salvador</MenuItem>
          <MenuItem value="70">Equatorial Guinea</MenuItem>
          <MenuItem value="71">Eritrea</MenuItem>
          <MenuItem value="72">Estonia</MenuItem>
          <MenuItem value="73">Ethiopia</MenuItem>
          <MenuItem value="74">Falkland Islands (Malvinas)</MenuItem>
          <MenuItem value="75">Faroe Islands</MenuItem>
          <MenuItem value="76">Fiji</MenuItem>
          <MenuItem value="77">Finland</MenuItem>
          <MenuItem value="78">France</MenuItem>
          <MenuItem value="79">French Guiana</MenuItem>
          <MenuItem value="80">French Polynesia</MenuItem>
          <MenuItem value="81">French Southern Territories</MenuItem>
          <MenuItem value="82">Gabon</MenuItem>
          <MenuItem value="83">Gambia</MenuItem>
          <MenuItem value="84">Georgia</MenuItem>
          <MenuItem value="85">Germany</MenuItem>
          <MenuItem value="86">Ghana</MenuItem>
          <MenuItem value="87">Gibraltar</MenuItem>
          <MenuItem value="88">Greece</MenuItem>
          <MenuItem value="89">Greenland</MenuItem>
          <MenuItem value="90">Grenada</MenuItem>
          <MenuItem value="91">Guadeloupe</MenuItem>
          <MenuItem value="92">Guam</MenuItem>
          <MenuItem value="93">Guatemala</MenuItem>
          <MenuItem value="94">Guernsey</MenuItem>
          <MenuItem value="95">Guinea</MenuItem>
          <MenuItem value="96">Guinea-Bissau</MenuItem>
          <MenuItem value="97">Guyana</MenuItem>
          <MenuItem value="98">Haiti</MenuItem>
          <MenuItem value="99">Heard Island and McDonald Islands</MenuItem>
          <MenuItem value="100">Holy See</MenuItem>
          <MenuItem value="101">Honduras</MenuItem>
          <MenuItem value="102">Hong Kong</MenuItem>
          <MenuItem value="103">Hungary</MenuItem>
          <MenuItem value="104">Iceland</MenuItem>
          <MenuItem value="105">India</MenuItem>
          <MenuItem value="106">Indonesia</MenuItem>
          <MenuItem value="107">Côte d'Ivoire</MenuItem>
          <MenuItem value="108">Iran (Islamic Republic of)</MenuItem>
          <MenuItem value="109">Iraq</MenuItem>
          <MenuItem value="110">Ireland</MenuItem>
          <MenuItem value="111">Isle of Man</MenuItem>
          <MenuItem value="112">Israel</MenuItem>
          <MenuItem value="113">Italy</MenuItem>
          <MenuItem value="114">Jamaica</MenuItem>
          <MenuItem value="115">Japan</MenuItem>
          <MenuItem value="116">Jersey</MenuItem>
          <MenuItem value="117">Jordan</MenuItem>
          <MenuItem value="118">Kazakhstan</MenuItem>
          <MenuItem value="119">Kenya</MenuItem>
          <MenuItem value="120">Kiribati</MenuItem>
          <MenuItem value="121">Kuwait</MenuItem>
          <MenuItem value="122">Kyrgyzstan</MenuItem>
          <MenuItem value="123">Lao People's Democratic Republic</MenuItem>
          <MenuItem value="124">Latvia</MenuItem>
          <MenuItem value="125">Lebanon</MenuItem>
          <MenuItem value="126">Lesotho</MenuItem>
          <MenuItem value="127">Liberia</MenuItem>
          <MenuItem value="128">Libya</MenuItem>
          <MenuItem value="129">Liechtenstein</MenuItem>
          <MenuItem value="130">Lithuania</MenuItem>
          <MenuItem value="131">Luxembourg</MenuItem>
          <MenuItem value="132">Macao</MenuItem>
          <MenuItem value="133">Macedonia (the former Yugoslav Republic of)</MenuItem>
          <MenuItem value="134">Madagascar</MenuItem>
          <MenuItem value="135">Malawi</MenuItem>
          <MenuItem value="136">Malaysia</MenuItem>
          <MenuItem value="137">Maldives</MenuItem>
          <MenuItem value="138">Mali</MenuItem>
          <MenuItem value="139">Malta</MenuItem>
          <MenuItem value="140">Marshall Islands</MenuItem>
          <MenuItem value="141">Martinique</MenuItem>
          <MenuItem value="142">Mauritania</MenuItem>
          <MenuItem value="143">Mauritius</MenuItem>
          <MenuItem value="144">Mayotte</MenuItem>
          <MenuItem value="145">Mexico</MenuItem>
          <MenuItem value="146">Micronesia (Federated States of)</MenuItem>
          <MenuItem value="147">Moldova (Republic of)</MenuItem>
          <MenuItem value="148">Monaco</MenuItem>
          <MenuItem value="149">Mongolia</MenuItem>
          <MenuItem value="150">Montenegro</MenuItem>
          <MenuItem value="151">Montserrat</MenuItem>
          <MenuItem value="152">Morocco</MenuItem>
          <MenuItem value="153">Mozambique</MenuItem>
          <MenuItem value="154">Myanmar</MenuItem>
          <MenuItem value="155">Namibia</MenuItem>
          <MenuItem value="156">Nauru</MenuItem>
          <MenuItem value="157">Nepal</MenuItem>
          <MenuItem value="158">Netherlands</MenuItem>
          <MenuItem value="159">New Caledonia</MenuItem>
          <MenuItem value="160">New Zealand</MenuItem>
          <MenuItem value="161">Nicaragua</MenuItem>
          <MenuItem value="162">Niger</MenuItem>
          <MenuItem value="163">Nigeria</MenuItem>
          <MenuItem value="164">Niue</MenuItem>
          <MenuItem value="165">Norfolk Island</MenuItem>
          <MenuItem value="166">Korea (Democratic People's Republic of)</MenuItem>
          <MenuItem value="167">Northern Mariana Islands</MenuItem>
          <MenuItem value="168">Norway</MenuItem>
          <MenuItem value="169">Oman</MenuItem>
          <MenuItem value="170">Pakistan</MenuItem>
          <MenuItem value="171">Palau</MenuItem>
          <MenuItem value="172">Palestine, State of</MenuItem>
          <MenuItem value="173">Panama</MenuItem>
          <MenuItem value="174">Papua New Guinea</MenuItem>
          <MenuItem value="175">Paraguay</MenuItem>
          <MenuItem value="176">Peru</MenuItem>
          <MenuItem value="177">Philippines</MenuItem>
          <MenuItem value="178">Pitcairn</MenuItem>
          <MenuItem value="179">Poland</MenuItem>
          <MenuItem value="180">Portugal</MenuItem>
          <MenuItem value="181">Puerto Rico</MenuItem>
          <MenuItem value="182">Qatar</MenuItem>
          <MenuItem value="183">Republic of Kosovo</MenuItem>
          <MenuItem value="184">Réunion</MenuItem>
          <MenuItem value="185">Romania</MenuItem>
          <MenuItem value="186">Russian Federation</MenuItem>
          <MenuItem value="187">Rwanda</MenuItem>
          <MenuItem value="188">Saint Barthélemy</MenuItem>
          <MenuItem value="189">Saint Helena, Ascension and Tristan da Cunha</MenuItem>
          <MenuItem value="190">Saint Kitts and Nevis</MenuItem>
          <MenuItem value="191">Saint Lucia</MenuItem>
          <MenuItem value="192">Saint Martin (French part)</MenuItem>
          <MenuItem value="193">Saint Pierre and Miquelon</MenuItem>
          <MenuItem value="194">Saint Vincent and the Grenadines</MenuItem>
          <MenuItem value="195">Samoa</MenuItem>
          <MenuItem value="196">San Marino</MenuItem>
          <MenuItem value="197">Sao Tome and Principe</MenuItem>
          <MenuItem value="198">Saudi Arabia</MenuItem>
          <MenuItem value="199">Senegal</MenuItem>
          <MenuItem value="200">Serbia</MenuItem>
          <MenuItem value="201">Seychelles</MenuItem>
          <MenuItem value="202">Sierra Leone</MenuItem>
          <MenuItem value="203">Singapore</MenuItem>
          <MenuItem value="204">Sint Maarten (Dutch part)</MenuItem>
          <MenuItem value="205">Slovakia</MenuItem>
          <MenuItem value="206">Slovenia</MenuItem>
          <MenuItem value="207">Solomon Islands</MenuItem>
          <MenuItem value="208">Somalia</MenuItem>
          <MenuItem value="209">South Africa</MenuItem>
          <MenuItem value="210">South Georgia and the South Sandwich Islands</MenuItem>
          <MenuItem value="211">Korea (Republic of)</MenuItem>
          <MenuItem value="212">South Sudan</MenuItem>
          <MenuItem value="213">Spain</MenuItem>
          <MenuItem value="214">Sri Lanka</MenuItem>
          <MenuItem value="215">Sudan</MenuItem>
          <MenuItem value="216">Suriname</MenuItem>
          <MenuItem value="217">Svalbard and Jan Mayen</MenuItem>
          <MenuItem value="218">Swaziland</MenuItem>
          <MenuItem value="219">Sweden</MenuItem>
          <MenuItem value="220">Switzerland</MenuItem>
          <MenuItem value="221">Syrian Arab Republic</MenuItem>
          <MenuItem value="222">Taiwan</MenuItem>
          <MenuItem value="223">Tajikistan</MenuItem>
          <MenuItem value="224">Tanzania, United Republic of</MenuItem>
          <MenuItem value="225">Thailand</MenuItem>
          <MenuItem value="226">Timor-Leste</MenuItem>
          <MenuItem value="227">Togo</MenuItem>
          <MenuItem value="228">Tokelau</MenuItem>
          <MenuItem value="229">Tonga</MenuItem>
          <MenuItem value="230">Trinidad and Tobago</MenuItem>
          <MenuItem value="231">Tunisia</MenuItem>
          <MenuItem value="232">Turkey</MenuItem>
          <MenuItem value="233">Turkmenistan</MenuItem>
          <MenuItem value="234">Turks and Caicos Islands</MenuItem>
          <MenuItem value="235">Tuvalu</MenuItem>
          <MenuItem value="236">Uganda</MenuItem>
          <MenuItem value="237">Ukraine</MenuItem>
          <MenuItem value="238">United Arab Emirates</MenuItem>
          <MenuItem value="239">United Kingdom of Great Britain and Northern Ireland</MenuItem>
          <MenuItem value="240">United States of America</MenuItem>
          <MenuItem value="241">Uruguay</MenuItem>
          <MenuItem value="242">Uzbekistan</MenuItem>
          <MenuItem value="243">Vanuatu</MenuItem>
          <MenuItem value="244">Venezuela (Bolivarian Republic of)</MenuItem>
          <MenuItem value="245">Viet Nam</MenuItem>
          <MenuItem value="246">Wallis and Futuna</MenuItem>
          <MenuItem value="247">Western Sahara</MenuItem>
          <MenuItem value="248">Yemen</MenuItem>
          <MenuItem value="249">Zambia</MenuItem>
          <MenuItem value="250">Zimbabwe</MenuItem>
        </Select><br/><br/>
        <Button variant="contained" color="secondary" type="submit">Post</Button>
      </form>
    )
  }
};

export default UpdateTripReportForm;

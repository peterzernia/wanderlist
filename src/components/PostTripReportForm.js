import React from 'react'
import Button from '@material-ui/core/Button'

const PostTripReportForm = (props) => (
  <div className='form-inline'>
    <form onSubmit={props.handleSubmit}>
      <input className="form-control user-auth" type='text' name="title" placeholder="Title"/><br/><br/>
      <textarea className="form-control user-auth" rows="4" cols="100" name="content" placeholder="Content"/><br/><br/>
      <select className="form-control user-auth" name="countries" id="id_countries" multiple="multiple">
        <option value="1">Afghanistan</option>
        <option value="2">Åland Islands</option>
        <option value="3">Albania</option>
        <option value="4">Algeria</option>
        <option value="5">American Samoa</option>
        <option value="6">Andorra</option>
        <option value="7">Angola</option>
        <option value="8">Anguilla</option>
        <option value="9">Antarctica</option>
        <option value="10">Antigua and Barbuda</option>
        <option value="11">Argentina</option>
        <option value="12">Armenia</option>
        <option value="13">Aruba</option>
        <option value="14">Australia</option>
        <option value="15">Austria</option>
        <option value="16">Azerbaijan</option>
        <option value="17">Bahamas</option>
        <option value="18">Bahrain</option>
        <option value="19">Bangladesh</option>
        <option value="20">Barbados</option>
        <option value="21">Belarus</option>
        <option value="22">Belgium</option>
        <option value="23">Belize</option>
        <option value="24">Benin</option>
        <option value="25">Bermuda</option>
        <option value="26">Bhutan</option>
        <option value="27">Bolivia (Plurinational State of)</option>
        <option value="28">Bonaire, Sint Eustatius and Saba</option>
        <option value="29">Bosnia and Herzegovina</option>
        <option value="30">Botswana</option>
        <option value="31">Bouvet Island</option>
        <option value="32">Brazil</option>
        <option value="56">Cook Islands</option>
        <option value="33">British Indian Ocean Territory</option>
        <option value="34">United States Minor Outlying Islands</option>
        <option value="35">Virgin Islands (British)</option>
        <option value="36">Virgin Islands (U.S.)</option>
        <option value="37">Brunei Darussalam</option>
        <option value="38">Bulgaria</option>
        <option value="39">Burkina Faso</option>
        <option value="40">Burundi</option>
        <option value="41">Cambodia</option>
        <option value="42">Cameroon</option>
        <option value="43">Canada</option>
        <option value="44">Cabo Verde</option>
        <option value="45">Cayman Islands</option>
        <option value="46">Central African Republic</option>
        <option value="47">Chad</option>
        <option value="48">Chile</option>
        <option value="49">China</option>
        <option value="50">Christmas Island</option>
        <option value="51">Cocos (Keeling) Islands</option>
        <option value="52">Colombia</option>
        <option value="53">Comoros</option>
        <option value="54">Congo</option>
        <option value="55">Congo (Democratic Republic of the)</option>
        <option value="57">Costa Rica</option>
        <option value="58">Croatia</option>
        <option value="59">Cuba</option>
        <option value="60">Curaçao</option>
        <option value="61">Cyprus</option>
        <option value="62">Czech Republic</option>
        <option value="63">Denmark</option>
        <option value="64">Djibouti</option>
        <option value="65">Dominica</option>
        <option value="66">Dominican Republic</option>
        <option value="67">Ecuador</option>
        <option value="68">Egypt</option>
        <option value="69">El Salvador</option>
        <option value="70">Equatorial Guinea</option>
        <option value="71">Eritrea</option>
        <option value="72">Estonia</option>
        <option value="73">Ethiopia</option>
        <option value="74">Falkland Islands (Malvinas)</option>
        <option value="75">Faroe Islands</option>
        <option value="76">Fiji</option>
        <option value="77">Finland</option>
        <option value="78">France</option>
        <option value="79">French Guiana</option>
        <option value="80">French Polynesia</option>
        <option value="81">French Southern Territories</option>
        <option value="82">Gabon</option>
        <option value="83">Gambia</option>
        <option value="84">Georgia</option>
        <option value="85">Germany</option>
        <option value="86">Ghana</option>
        <option value="87">Gibraltar</option>
        <option value="88">Greece</option>
        <option value="89">Greenland</option>
        <option value="90">Grenada</option>
        <option value="91">Guadeloupe</option>
        <option value="92">Guam</option>
        <option value="93">Guatemala</option>
        <option value="94">Guernsey</option>
        <option value="95">Guinea</option>
        <option value="96">Guinea-Bissau</option>
        <option value="97">Guyana</option>
        <option value="98">Haiti</option>
        <option value="99">Heard Island and McDonald Islands</option>
        <option value="100">Holy See</option>
        <option value="101">Honduras</option>
        <option value="102">Hong Kong</option>
        <option value="103">Hungary</option>
        <option value="104">Iceland</option>
        <option value="105">India</option>
        <option value="106">Indonesia</option>
        <option value="107">Côte d'Ivoire</option>
        <option value="108">Iran (Islamic Republic of)</option>
        <option value="109">Iraq</option>
        <option value="110">Ireland</option>
        <option value="111">Isle of Man</option>
        <option value="112">Israel</option>
        <option value="113">Italy</option>
        <option value="114">Jamaica</option>
        <option value="115">Japan</option>
        <option value="116">Jersey</option>
        <option value="117">Jordan</option>
        <option value="118">Kazakhstan</option>
        <option value="119">Kenya</option>
        <option value="120">Kiribati</option>
        <option value="121">Kuwait</option>
        <option value="122">Kyrgyzstan</option>
        <option value="123">Lao People's Democratic Republic</option>
        <option value="124">Latvia</option>
        <option value="125">Lebanon</option>
        <option value="126">Lesotho</option>
        <option value="127">Liberia</option>
        <option value="128">Libya</option>
        <option value="129">Liechtenstein</option>
        <option value="130">Lithuania</option>
        <option value="131">Luxembourg</option>
        <option value="132">Macao</option>
        <option value="133">Macedonia (the former Yugoslav Republic of)</option>
        <option value="134">Madagascar</option>
        <option value="135">Malawi</option>
        <option value="136">Malaysia</option>
        <option value="137">Maldives</option>
        <option value="138">Mali</option>
        <option value="139">Malta</option>
        <option value="140">Marshall Islands</option>
        <option value="141">Martinique</option>
        <option value="142">Mauritania</option>
        <option value="143">Mauritius</option>
        <option value="144">Mayotte</option>
        <option value="145">Mexico</option>
        <option value="146">Micronesia (Federated States of)</option>
        <option value="147">Moldova (Republic of)</option>
        <option value="148">Monaco</option>
        <option value="149">Mongolia</option>
        <option value="150">Montenegro</option>
        <option value="151">Montserrat</option>
        <option value="152">Morocco</option>
        <option value="153">Mozambique</option>
        <option value="154">Myanmar</option>
        <option value="155">Namibia</option>
        <option value="156">Nauru</option>
        <option value="157">Nepal</option>
        <option value="158">Netherlands</option>
        <option value="159">New Caledonia</option>
        <option value="160">New Zealand</option>
        <option value="161">Nicaragua</option>
        <option value="162">Niger</option>
        <option value="163">Nigeria</option>
        <option value="164">Niue</option>
        <option value="165">Norfolk Island</option>
        <option value="166">Korea (Democratic People's Republic of)</option>
        <option value="167">Northern Mariana Islands</option>
        <option value="168">Norway</option>
        <option value="169">Oman</option>
        <option value="170">Pakistan</option>
        <option value="171">Palau</option>
        <option value="172">Palestine, State of</option>
        <option value="173">Panama</option>
        <option value="174">Papua New Guinea</option>
        <option value="175">Paraguay</option>
        <option value="176">Peru</option>
        <option value="177">Philippines</option>
        <option value="178">Pitcairn</option>
        <option value="179">Poland</option>
        <option value="180">Portugal</option>
        <option value="181">Puerto Rico</option>
        <option value="182">Qatar</option>
        <option value="183">Republic of Kosovo</option>
        <option value="184">Réunion</option>
        <option value="185">Romania</option>
        <option value="186">Russian Federation</option>
        <option value="187">Rwanda</option>
        <option value="188">Saint Barthélemy</option>
        <option value="189">Saint Helena, Ascension and Tristan da Cunha</option>
        <option value="190">Saint Kitts and Nevis</option>
        <option value="191">Saint Lucia</option>
        <option value="192">Saint Martin (French part)</option>
        <option value="193">Saint Pierre and Miquelon</option>
        <option value="194">Saint Vincent and the Grenadines</option>
        <option value="195">Samoa</option>
        <option value="196">San Marino</option>
        <option value="197">Sao Tome and Principe</option>
        <option value="198">Saudi Arabia</option>
        <option value="199">Senegal</option>
        <option value="200">Serbia</option>
        <option value="201">Seychelles</option>
        <option value="202">Sierra Leone</option>
        <option value="203">Singapore</option>
        <option value="204">Sint Maarten (Dutch part)</option>
        <option value="205">Slovakia</option>
        <option value="206">Slovenia</option>
        <option value="207">Solomon Islands</option>
        <option value="208">Somalia</option>
        <option value="209">South Africa</option>
        <option value="210">South Georgia and the South Sandwich Islands</option>
        <option value="211">Korea (Republic of)</option>
        <option value="212">South Sudan</option>
        <option value="213">Spain</option>
        <option value="214">Sri Lanka</option>
        <option value="215">Sudan</option>
        <option value="216">Suriname</option>
        <option value="217">Svalbard and Jan Mayen</option>
        <option value="218">Swaziland</option>
        <option value="219">Sweden</option>
        <option value="220">Switzerland</option>
        <option value="221">Syrian Arab Republic</option>
        <option value="222">Taiwan</option>
        <option value="223">Tajikistan</option>
        <option value="224">Tanzania, United Republic of</option>
        <option value="225">Thailand</option>
        <option value="226">Timor-Leste</option>
        <option value="227">Togo</option>
        <option value="228">Tokelau</option>
        <option value="229">Tonga</option>
        <option value="230">Trinidad and Tobago</option>
        <option value="231">Tunisia</option>
        <option value="232">Turkey</option>
        <option value="233">Turkmenistan</option>
        <option value="234">Turks and Caicos Islands</option>
        <option value="235">Tuvalu</option>
        <option value="236">Uganda</option>
        <option value="237">Ukraine</option>
        <option value="238">United Arab Emirates</option>
        <option value="239">United Kingdom of Great Britain and Northern Ireland</option>
        <option value="240">United States of America</option>
        <option value="241">Uruguay</option>
        <option value="242">Uzbekistan</option>
        <option value="243">Vanuatu</option>
        <option value="244">Venezuela (Bolivarian Republic of)</option>
        <option value="245">Viet Nam</option>
        <option value="246">Wallis and Futuna</option>
        <option value="247">Western Sahara</option>
        <option value="248">Yemen</option>
        <option value="249">Zambia</option>
        <option value="250">Zimbabwe</option>
      </select><br/>
      <Button variant="contained" color="primary" type="submit">Post</Button>
    </form>
  </div>
);

export default PostTripReportForm;

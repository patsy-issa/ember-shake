import DS from 'ember-data';
import { attr } from "ember-computed-decorators/ember-data";

let { Model } = DS;

export default Model.extend({
 @attr('string') fullName,
 @attr('string') company,
 @attr('string') twitter,
 @attr('string') note,
 @attr('date')   createdAt
});
